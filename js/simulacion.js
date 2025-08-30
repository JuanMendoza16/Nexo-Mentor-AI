// ==========================================================
// Utilidades UI
// ==========================================================
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
$$('.nav button').forEach(b => b.addEventListener('click', () => {
    $$('.nav button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const id = b.dataset.goto;
    $$('[data-view]').forEach(v => v.classList.remove('active'));
    if (id) $('#' + id).classList.add('active');
}));
$$('[data-goto]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.goto;
    if (!id) return;
    $$('.nav button').forEach(x => x.classList.toggle('active', x.dataset.goto === id));
    $$('[data-view]').forEach(v => v.classList.remove('active'));
    $('#' + id).classList.add('active');
}));

// ==========================================================
// Patrones: Subject/Observer (simple)
// ==========================================================
class Subject {
    constructor() { this.observers = new Set(); }
    subscribe(fn) { this.observers.add(fn); }
    unsubscribe(fn) { this.observers.delete(fn); }
    notify(data) { this.observers.forEach(fn => fn(data)); }
}

// ==========================================================
// Patrones: State
// ==========================================================
const States = Object.freeze({ Idle: 'Idle', DatasetLoaded: 'DatasetLoaded', Preprocessed: 'Preprocessed', Training: 'Training', Finished: 'Finished' });

class SimulatorState {
    constructor(ctx) { this.ctx = ctx; }
    enter() { }
    exit() { }
    can(action) { return false; }
}
class IdleState extends SimulatorState {
    can(a) { return a === 'load'; }
}
class DatasetLoadedState extends SimulatorState {
    can(a) { return a === 'prep' || a === 'reset'; }
}
class PreprocessedState extends SimulatorState {
    can(a) { return a === 'train' || a === 'reset'; }
}
class TrainingState extends SimulatorState {
    can(a) { return a === 'finish' || a === 'reset'; }
}
class FinishedState extends SimulatorState {
    can(a) { return a === 'reset' || a === 'train'; }
}

// ==========================================================
// Factory: creación de objetos simulados
// ==========================================================
const DatasetFactory = {
    create() {
        const size = Math.floor(50000 + Math.random() * 250000); // nº documentos
        const tokens = size * Math.floor(50 + Math.random() * 200);
        const formats = ['JSONL', 'CSV', 'TXT', 'Parquet'];
        const format = formats[Math.floor(Math.random() * formats.length)];
        return { name: 'Corpus Sintético', size, tokens, format };
    }
};

const MetricFactory = {
    // genera trayectorias suaves decreciente (loss) y creciente (acc)
    createTrajectory(epochs = 20) {
        let loss = [], acc = []; let l = 2.0 + Math.random() * 1.0, a = 0.2 + Math.random() * 0.15;
        for (let e = 1; e <= epochs; e++) {
            // ruido suave
            l *= 0.86 + Math.random() * 0.04;
            a = Math.min(0.99, a + 0.03 + Math.random() * 0.03);
            loss.push(Number(l.toFixed(3))); acc.push(Number(a.toFixed(3)));
        }
        return { loss, acc };
    }
};

// ==========================================================
// Command: acciones de UI
// ==========================================================
class Command { constructor(exec) { this.exec = exec; } execute() { this.exec(); } }

// ==========================================================
// Dibujado de gráficos (sin librerías)
// ==========================================================
class MiniChart {
    constructor(canvas, { min = 0, max = 1, grid = true, color = '#6aa4ff' } = {}) {
        this.cv = canvas; this.cx = canvas.getContext('2d');
        this.min = min; this.max = max; this.grid = grid; this.color = color; this.data = [];
        this.draw();
        addEventListener('resize', () => this.draw());
    }
    setData(arr) { this.data = arr || []; this.draw(); }
    _map(v) { return 10 + (this.cv.height - 20) * (1 - (v - this.min) / (this.max - this.min)); }
    draw() {
        const { cv, cx } = this; cx.clearRect(0, 0, cv.width, cv.height);
        // fondo
        cx.fillStyle = '#0c1333'; cx.fillRect(0, 0, cv.width, cv.height);
        // grid
        if (this.grid) {
            cx.strokeStyle = 'rgba(255,255,255,.06)'; cx.lineWidth = 1; cx.beginPath();
            for (let i = 0; i <= 5; i++) { let y = i * (cv.height / 5); cx.moveTo(0, y); cx.lineTo(cv.width, y); } cx.stroke();
        }
        // línea
        if (!this.data.length) return;
        cx.strokeStyle = this.color; cx.lineWidth = 2; cx.beginPath();
        const step = (cv.width - 20) / Math.max(1, this.data.length - 1);
        this.data.forEach((v, i) => {
            const x = 10 + step * i; const y = this._map(v);
            if (i === 0) cx.moveTo(x, y); else cx.lineTo(x, y);
        });
        cx.stroke();
        // puntos
        cx.fillStyle = this.color; this.data.forEach((v, i) => { const x = 10 + step * i, y = this._map(v); cx.beginPath(); cx.arc(x, y, 2.5, 0, Math.PI * 2); cx.fill(); });
    }
}

// ==========================================================
// Contexto del simulador
// ==========================================================
const ui = {
    stateChip: $('#stateChip'), epochChip: $('#epochChip'), batchChip: $('#batchChip'),
    kSize: $('#kpiSize'), kTok: $('#kpiTokens'), kFmt: $('#kpiFormat'), kOpt: $('#kpiOpt'), flow: $('#flowInfo'),
    btnLoad: $('#btnLoad'), btnPrep: $('#btnPrep'), btnTrain: $('#btnTrain'), btnResults: $('#btnResults'), btnReset: $('#btnReset')
};

const lossChart = new MiniChart($('#lossCanvas'), { min: 0, max: 3, color: '#ff9f6b' });
const accChart = new MiniChart($('#accCanvas'), { min: 0, max: 1, color: '#6ee7b7' });

class SimulatorContext {
    constructor() {
        this.state = new IdleState(this); this.stateName = States.Idle;
        this.subject = new Subject(); // observers de métricas
        this.dataset = null; this.epochs = 0; this.batch = '-';
        this.loss = []; this.acc = []; this.optimizer = 'AdamW';
        this._bindUI(); this.render();
    }
    _bindUI() {
        // Commands
        this.loadCmd = new Command(() => this.loadDataset());
        this.prepCmd = new Command(() => this.preprocess());
        this.trainCmd = new Command(() => this.train());
        this.resCmd = new Command(() => this.finish());
        this.resetCmd = new Command(() => this.reset());

        ui.btnLoad.addEventListener('click', () => this.try('load', this.loadCmd));
        ui.btnPrep.addEventListener('click', () => this.try('prep', this.prepCmd));
        ui.btnTrain.addEventListener('click', () => this.try('train', this.trainCmd));
        ui.btnResults.addEventListener('click', () => this.try('finish', this.resCmd));
        ui.btnReset.addEventListener('click', () => this.try('reset', this.resetCmd));

        // Observer subscribers
        this.subject.subscribe(({ loss, acc, epoch, batch }) => {
            lossChart.setData(loss); accChart.setData(acc);
            ui.epochChip.textContent = 'Época: ' + epoch;
            ui.batchChip.textContent = 'Batch: ' + batch;
        });
    }
    setState(S) { this.state = new S(this); this.stateName = Object.keys(States).find(k => States[k] === this.stateName) || this.stateName; this.render(); }
    setStateName(name) { this.stateName = name; ui.stateChip.textContent = 'Estado: ' + name; }
    try(action, cmd) { if (this.state.can(action)) cmd.execute(); }

    // Acciones
    loadDataset() {
        this.dataset = DatasetFactory.create();
        this.setStateName(States.DatasetLoaded); this.state = new DatasetLoadedState(this);
        this.render();
    }
    preprocess() {
        // simple simulación de aumentos
        if (!this.dataset) return;
        this.dataset.tokens = Math.floor(this.dataset.tokens * (1.1 + Math.random() * 0.3));
        this.setStateName(States.Preprocessed); this.state = new PreprocessedState(this);
        this.render();
    }
    async train() {
        this.setStateName(States.Training); this.state = new TrainingState(this);
        const traj = MetricFactory.createTrajectory(24);
        this.loss = []; this.acc = []; this.epochs = 0;
        // animación de entrenamiento
        for (let i = 0; i < traj.loss.length; i++) {
            await new Promise(r => setTimeout(r, 220));
            this.epochs = i + 1; this.batch = Math.floor(32 + Math.random() * 96);
            this.loss.push(traj.loss[i]); this.acc.push(traj.acc[i]);
            this.subject.notify({ loss: this.loss, acc: this.acc, epoch: this.epochs, batch: this.batch });
        }
    }
    finish() {
        if (this.acc.length) { this.setStateName(States.Finished); this.state = new FinishedState(this); }
        this.render();
    }
    reset() {
        this.state = new IdleState(this); this.setStateName(States.Idle);
        this.dataset = null; this.epochs = 0; this.batch = '-'; this.loss = []; this.acc = [];
        this.render(); this.subject.notify({ loss: [], acc: [], epoch: 0, batch: '-' });
    }

    render() {
        // KPIs
        ui.kSize.textContent = this.dataset ? Intl.NumberFormat('es-AR').format(this.dataset.size) : '-';
        ui.kTok.textContent = this.dataset ? Intl.NumberFormat('es-AR').format(this.dataset.tokens) : '-';
        ui.kFmt.textContent = this.dataset ? this.dataset.format : '-';
        ui.kOpt.textContent = this.optimizer;

        // habilitar botones según estado
        const st = this.state instanceof IdleState ? 'Idle' :
            this.state instanceof DatasetLoadedState ? 'DatasetLoaded' :
                this.state instanceof PreprocessedState ? 'Preprocessed' :
                    this.state instanceof TrainingState ? 'Training' : 'Finished';
        ui.stateChip.textContent = 'Estado: ' + st;

        ui.btnLoad.disabled = !(st === 'Idle' || st === 'Finished');
        ui.btnPrep.disabled = !(st === 'DatasetLoaded');
        ui.btnTrain.disabled = !(st === 'Preprocessed' || st === 'Finished');
        ui.btnResults.disabled = !(st === 'Training' || st === 'Finished');

        // Flow cards
        ui.flow.innerHTML = '';
        const steps = [
            { k: 'Dataset', ok: !!this.dataset, txt: this.dataset ? 'Cargado' : 'Pendiente' },
            { k: 'Preprocesado', ok: st === 'Preprocessed' || st === 'Training' || st === 'Finished', txt: st === 'DatasetLoaded' ? 'Listo para ejecutar' : (st === 'Idle' ? 'Pendiente' : 'Hecho') },
            { k: 'Entrenamiento', ok: st === 'Training' || st === 'Finished', txt: st === 'Training' ? 'En progreso' : '—' },
            { k: 'Resultados', ok: st === 'Finished', txt: st === 'Finished' ? 'Listos' : '—' }
        ];
        steps.forEach(s => {
            const el = document.createElement('div'); el.className = 'step';
            el.innerHTML = `<h4>${s.k} ${s.ok ? '✅' : '⏳'}</h4><p>${s.txt}</p>`;
            ui.flow.appendChild(el);
        });
    }
}

// Iniciar
const sim = new SimulatorContext();