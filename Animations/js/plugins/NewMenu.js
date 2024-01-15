//=============================================================================
// NewMenu.js
//=============================================================================


(function () {

	//-----------------------------------------------------------------------------

	// SCENE MENU: pause screen

	Scene_Menu.prototype.back = function () {
		if (this._active) SceneManager.pop()
	}

	/**
	 * Reimplemented.
	 * Creates the button list (`Window_MenuCommand`)
	 */
	Scene_Menu.prototype.createCommandWindow = function () {
		// this._commandWindow = new Window_MenuCommand(this._elementPaddings, 0);
		// this._commandWindow.setHandler('item', this.commandItem.bind(this));
		// this._commandWindow.setHandler('cancel', this.back.bind(this));
		// this._commandWindow.width = this._commandWindow.windowWidth()
		// this.addWindow(this._commandWindow);

		// this._commandWindow = new Window_Dataset(0, 0, Graphics.width, Graphics.height);
		// this._commandWindow.setHandlers(this)
		// this.addWindow(this._commandWindow);
	};


	//----------------------------------

	// SCENE TITLE: Main menu

	/**
	 * Reimplemented.
	 * Removes 'continue' command
	 */
	Window_TitleCommand.prototype.makeCommandList = function () {
		this.addCommand(TextManager.newGame, 'newGame');
	};

	/**
	 * Reimplemented.
	 * Creates the button list (`Window_TitleCommand`)
	 */
	Scene_Title.prototype.createCommandWindow = function () {
		this._commandWindow = new Window_TitleCommand();
		// this._commandWindow.x = 110
		this._commandWindow.y = Graphics.height / 2
		this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
		this.addWindow(this._commandWindow);
	};

	// -------------------------------------
	// ITEM WINDOW

	/**
	 * Reimplemented.
	 * Creates the button list on the top of the item list window
	 * ('armor' and 'weapon' commands removed)
	 */
	Window_ItemCategory.prototype.makeCommandList = function () {
		this.addCommand(TextManager.item, 'item');
	};

	/**
	 * Reimplemented.
	 * Sets the max number of columns
	 */
	Window_ItemCategory.prototype.maxCols = function () {
		return 1
	}
})();
