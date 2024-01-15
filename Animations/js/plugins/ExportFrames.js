/*:
 * @author Caio Oliveira
 * @plugindesc Export animation frames
 * @help
 * Inspired on Casper Gaming's plugin (https://www.caspergaming.com/plugins/cgmz/screenshots/)
*/
/*:
 * @param saveDir
 * @text Directory to save frames
 * @type text
 * 
 * @param saveRate
 * @text Number of frames to save per frame count
 * @type number
 * @min 1
 * @default 1
 */
const fs = require('fs');
const exportFramesParams = PluginManager.parameters('ExportFrames')
/** @type {string} */
const DIR_PATH = exportFramesParams["saveDir"]
const SAVE_RATE = Number(exportFramesParams["saveRate"])

if (!fs.existsSync(DIR_PATH)) fs.mkdirSync(DIR_PATH);
class Frame {
    /**
     * Creates a new frame
     * @param {Blob} dataBlob image data as blob
     * @param {string} dataURL image data as string
     * @param {string} name frame name
     */
    constructor(dataURL, name) {
        this.name = name
        this.dataURL = dataURL
    }
}

class FrameStorage {
    /** Creates a new frame storage */
    constructor() {
        /**@type {Frame[]} */
        this.frames = []
        /**@type {string} */
        this.mapName = ""
        /**@type {Sprite[]} */
        this._sprites = []

        this.parentDir = ""
        this.framesDir = ""
        this.base64Dir = ""
    }

    _createDirs() {
        this.parentDir = `${DIR_PATH}/${this.mapName}`
        if (!fs.existsSync(this.parentDir)) fs.mkdirSync(this.parentDir);
        this.framesDir = `${this.parentDir}/frames`
        this.base64Dir = `${this.parentDir}/base64`
        if (!fs.existsSync(this.framesDir)) fs.mkdirSync(this.framesDir);
        if (!fs.existsSync(this.base64Dir)) fs.mkdirSync(this.base64Dir);
    }

    /**
     * Adds a new frame to the storage
     * @param {string} dataURL frame data as string
     */
    addNewFrame(dataURL) {
        if (this.frames.length && dataURL == this.frames.slice(-1)[0].dataURL) return
        const name = `${this.mapName}_frame${this.frames.length}`
        const frame = new Frame(dataURL, name)
        this.frames.push(frame)
    }

    createFrameSprite() {
        const width = Graphics.width;
        const height = Graphics.height;
        const bitmap1 = new Bitmap(width, height);
        const bitmap2 = Bitmap.snap(SceneManager._scene);
        bitmap1.blt(bitmap2, 0, 0, width, height, 0, 0, width, height);
        this._sprites.push(new Sprite(bitmap1))
    }
    /**
     * @param {Frame} frame 
     */
    downloadFrame(frame) {
        const a = document.createElement('a');
        document.body.append(a);
        a.download = frame.name
        a.href = frame.dataURL
        a.click();
        a.remove();
    }
    /**
     * @param {Frame} frame 
     */
    downloadFrameToLocalFiles(frame) {
        fs.writeFileSync(`${this.base64Dir}/${frame.name}.txt`, frame.dataURL);
        const data = frame.dataURL.split(",")[1];
        fs.writeFileSync(`${this.framesDir}/${frame.name}.png`, data, 'base64');
    }
    /**
     * @param { 0 | 1 | 2} saveMode 0 - download file | 1 - rpg maker storage | 2- both
     * @param {string} name
     */
    createFrames(saveMode = 0, name) {
        this.mapName = name
        this._createDirs()

        while (this._sprites.length) {
            const sprite = this._sprites.shift()
            /** @type {HTMLCanvasElement} */
            const canvas = Graphics._renderer.extract.canvas(sprite)
            const dataURL = canvas.toDataURL('image/png')
            this.addNewFrame(dataURL)
        }

        while (this.frames.length) {
            const frame = this.frames.shift()
            if (saveMode == 1 || saveMode == 2) this.downloadFrameToLocalFiles(frame)
            if (saveMode == 0 || saveMode == 2) this.downloadFrame(frame)
        }
    }
}

/**@type {FrameStorage} */
$frameStorage = new FrameStorage("")

const _Game_Map_initialize = Game_Map.prototype.initialize
Game_Map.prototype.initialize = function () {
    _Game_Map_initialize.call(this)
    $frameStorage = new FrameStorage() //resets storage
}


var _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function () {
    _Game_Player_performTransfer.call(this);
    $frameStorage = new FrameStorage() //resets storage
}

const _Scene_Map_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this)

    if (!this._messageWindow._openness) {
        const isExpectedFrame = Graphics.frameCount % SAVE_RATE === 0

        if ($gameMap.isEventRunning() && isExpectedFrame)
            $frameStorage.createFrameSprite()

    }
    else if ($frameStorage._sprites.length && (!$gameMap.isEventRunning() || this._messageWindow._openness)) {
        console.log(`creating frames (${$frameStorage._sprites.length})...`)
        $frameStorage.createFrames(1, $dataMapInfos.filter((v) => v && v.id == $gameMap.mapId())[0].name)
        $frameStorage = new FrameStorage() //resets storage
    }
}


