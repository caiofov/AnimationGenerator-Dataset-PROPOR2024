/**
 * @author Caio Oliveira
 * @plugindesc Dataset for PROPOR
 * **/

/** /*:
* @helpme
* List all animation dataset
*/

/**
 * @typedef {{id:number symbol:string text:string prompt:string generated:string}} AnimationMap 
 */

/**
 * Returns all animation maps formatted and sorted
 * @returns {AnimationMap[]}
 */
function getMaps() {
    return $dataMapInfos.filter((value) => value && value.name.includes("_")).map((value) => ({ id: value.id, symbol: value.name, text: value.name })).sort((a, b) => {
        const textA = a.text.toUpperCase()
        const textB = b.text.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
}

/**
 * @param {number} mapId 
 */
function transportPlayer(mapId) {
    SceneManager.push(Scene_Map)
    $gamePlayer.reserveTransfer(mapId, 0, 0);
    $gamePlayer.requestMapReload();
}

/** @type {AnimationMap} */
let $SELECTED_DATA = null


/**
 * @param {number} x 
 * @param {number} y 
 * @param {boolean} horz 
 * @param {number} marginTop 
 * @param {string} align 
 */
function Window_CommandDatasetBase(x, y, horz = false, marginTop = 0, align = "left") {
    this.initialize.apply(this, arguments);
}
Window_CommandDatasetBase.prototype = Object.create(Window_Command.prototype);
Window_CommandDatasetBase.prototype.constructor = Window_CommandDatasetBase;


Window_CommandDatasetBase.prototype.initialize = function (x, y, horz = false, marginTop = 0, align = "left") {
    this._horz = horz
    this._align = align
    this._marginTop = marginTop

    Window_Command.prototype.initialize.call(this, x, y);
};

Window_CommandDatasetBase.prototype.makeCommandList = function () {
    for (const command of this._commands)
        this.addCommand(command.text, command.symbol)
};

Window_CommandDatasetBase.prototype.itemRect = function (index) {
    const rect = Window_Command.prototype.itemRect.call(this, index);
    rect.y += this._marginTop
    return rect
};

Window_CommandDatasetBase.prototype.windowWidth = function () {
    return this._width;
};

Window_CommandDatasetBase.prototype.windowHeight = function () {
    return this._height
};

Window_CommandDatasetBase.prototype.maxCols = function () {
    return this._horz ? this._commands.length : 2
};
Window_CommandDatasetBase.prototype.numVisibleRows = function () {
    return this._horz ? 1 : this._commands.length
};

Window_CommandDatasetBase.prototype.itemTextAlign = function () {
    return this._horz ? 'center' : this._align;
};
Window_CommandDatasetBase.prototype.additionalContent = function () {

}
Window_CommandDatasetBase.prototype.refresh = function () {
    this.contents.clear();
    Window_Command.prototype.refresh.call(this);
    this.additionalContent()
};


Window_CommandDatasetBase.prototype.callHandler = function (symbol) {
    Window_Command.prototype.callHandler.call(this, symbol)
    Window_Base.prototype.activate.call(this)
}

Window_CommandDatasetBase.prototype.select = function (index) {
    Window_Command.prototype.select.call(this, index)
    if (this._list[index]) this.callHandler(this._list[index].symbol)

}

function Window_Dataset_Command() {
    this.initialize.apply(this, arguments);
}
Window_Dataset_Command.prototype = Object.create(Window_CommandDatasetBase.prototype);
Window_Dataset_Command.prototype.constructor = Window_Dataset_Command;

Window_Dataset_Command.prototype.initialize = function (x, y, width, height) {
    this._width = width
    this._height = height
    this._commands = [
        { text: "< Go back to dataset", symbol: "dataset" },
        { text: "Go to animation >", symbol: "animation" }
    ]

    Window_CommandDatasetBase.prototype.initialize.call(this, x, y, true);

    this.setHandler("dataset", () => {
        transportPlayer(1)
    });
    this.setHandler("animation", () => {
        transportPlayer($SELECTED_DATA.id)
    })
};


/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} title 
 */
function Window_Dataset_ItemTitle(x, y, width, height, title) {
    this.initialize.apply(this, arguments);
}
Window_Dataset_ItemTitle.prototype = Object.create(Window_CommandDatasetBase.prototype);
Window_Dataset_ItemTitle.prototype.constructor = Window_Dataset_ItemTitle;

/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} title 
 */
Window_Dataset_ItemTitle.prototype.initialize = function (x, y, width, height, title) {
    this._width = width
    this._height = height

    this._commands = [{ text: "Prompt", symbol: "prompt" }, { text: "Generated text", symbol: "generated" }]

    this._title = title
    Window_CommandDatasetBase.prototype.initialize.call(this, x, y, true, 60);
};


Window_Dataset_ItemTitle.prototype.additionalContent = function () {
    this.makeFontBigger()
    this.drawText(this._title, 0, 0, this._width, "center")
    this.makeFontSmaller()
};



function Window_Dataset_ItemContent() {
    this.initialize.apply(this, arguments);
}
Window_Dataset_ItemContent.prototype = Object.create(Window_Base.prototype);
Window_Dataset_ItemContent.prototype.constructor = Window_Dataset_ItemContent;



/**
 * Creates an instance of Window_Dataset_ItemContent.
 * @param {Number} x - x coordinate
 * @param {Number} y - y coordinate
 * @param {Number} width - width
 * @param {Number} height - height
 * @param {string} content - data item to be displayed
 */
Window_Dataset_ItemContent.prototype.initialize = function (x, y, width, height, content) {
    this._width = width
    this._height = height
    this._itemContent = content

    this._currentY = 0
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};
/**
 * 
 * @param {string} newContent 
 */
Window_Dataset_ItemContent.prototype.changeContent = function (newContent) {
    this._itemContent = newContent
    this._currentY = 0
    this.refresh()
}

/**
 * Divides text with new line
 * @param {string} text 
 */
Window_Dataset_ItemContent.prototype.wrapText = function (text) {
    const words = text.split(' ');
    let currentLine = words[0];
    /** @type {string[]} */
    const lines = []

    for (const word of words.slice(1)) {
        const line = currentLine + ' ' + word;
        if (this.textWidth(line) <= this._width - 2 * this.padding) {
            currentLine = line;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine.length) lines.push(currentLine);


    return lines;
}


/**@param {string} text */
Window_Dataset_ItemContent.prototype.drawText = function (text) {
    for (const line of this.wrapText(text)) {
        Window_Base.prototype.drawText.call(this, line, 0, this._currentY, Graphics.width, "left");
        this._currentY += this.lineHeight()
    }
}
Window_Dataset_ItemContent.prototype.refresh = function () {
    this.contents.clear();
    this.drawText(this._itemContent)
};



function Scene_Dataset_Item() {
    this.initialize.apply(this, arguments);
}
Scene_Dataset_Item.prototype = Object.create(Scene_Base.prototype);
Scene_Dataset_Item.prototype.constructor = Scene_Dataset_Item;


Scene_Dataset_Item.prototype.create = function () {
    this._selectedContent = "prompt"
    Scene_Base.prototype.create.call(this);
    this.createWindowLayer();

    const h1 = 1.3 * Graphics.height / 6
    const h2 = 3 * Graphics.height / 6
    const h3 = 0.7 * Graphics.height / 6
    const heightPadding = (Graphics.height - (h1 + h2 + h3)) / 3
    this._itemContentWindow = new Window_Dataset_ItemContent(0, h1 + heightPadding, Graphics.width, h2, $SELECTED_DATA.prompt)
    this._commandWindow = new Window_Dataset_Command(0, Graphics.height - h3, Graphics.width, h3)

    this.createTitleWindow(h1)

    this.addWindow(this._itemContentWindow)
    this.addWindow(this._commandWindow)
};

/**
 * @param {keyof (typeof AnimationMap)} contentId 
 */
Scene_Dataset_Item.prototype.changeContentWindow = function (contentId) {
    this._itemContentWindow.changeContent($SELECTED_DATA[contentId])
}
Scene_Dataset_Item.prototype.createTitleWindow = function (height) {
    this._itemTitleWindow = new Window_Dataset_ItemTitle(0, 0, Graphics.width, height, $SELECTED_DATA.text)

    for (const command of this._itemTitleWindow._commands)
        this._itemTitleWindow.setHandler(command.symbol, this.changeContentWindow.bind(this, command.symbol))


    this.addWindow(this._itemTitleWindow)
}



/** @param {AnimationMap} data */
Scene_Menu.prototype.changeScene = function (data) {
    DataManager.loadMapData(data.id)

    const dataMapInterval = setInterval(waitForDataMap, 50)

    /**  Executes its body only if `$dataMap` has a value. Repeats it every 500 milliseconds */
    function waitForDataMap() {
        if ($dataMap) {
            clearInterval(dataMapInterval)

            /** @type {{prompt:string sentence:string}} */
            const note = JSON.parse($dataMap.note)
            data.prompt = note.prompt
            data.generated = note.sentence

            $SELECTED_DATA = data
            SceneManager.push(Scene_Dataset_Item)
        }
    }

}

Scene_Menu.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_Dataset(0, 0, Graphics.width, Graphics.height);
    for (const map of getMaps())
        this._commandWindow.setHandler(map.symbol, this.changeScene.bind(this, map));
    this.addWindow(this._commandWindow);
};

Scene_Menu.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);
};

Scene_Menu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._elementPaddings = 5 //padding entre os elementos do menu
    this.createCommandWindow();
};




function Window_Dataset() {
    this.initialize.apply(this, arguments);
}
Window_Dataset.prototype = Object.create(Window_CommandDatasetBase.prototype);
Window_Dataset.prototype.constructor = Window_Dataset;

/**
 * Creates an instance of Window_Dataset.
 * @param {Number} x - x coordinate
 * @param {Number} y - y coordinate
 * @param {Number} width - width
 * @param {Number} height - height
 */
Window_Dataset.prototype.initialize = function (x, y, width, height) {
    this._width = width
    this._height = height

    this._title = "Dataset"
    this._commands = getMaps()
    Window_CommandDatasetBase.prototype.initialize.call(this, x, y, false, 50);
};

Window_Dataset.prototype.additionalContent = function () {
    this.makeFontBigger()
    this.drawText(this._title, 0, 0, Graphics.width, "center")
}

Window_Dataset.prototype.lineHeight = function () {
    return 50
}
