
import {hasOwnProperty} from '_handsontable@0.34.5@handsontable/src/helpers/object';
import Selection from '_handsontable@0.34.5@handsontable/src/3rdparty/walkontable/src/selection';
import CellRange from '_handsontable@0.34.5@handsontable/src/3rdparty/walkontable/src/cell/range';

export default (function (hot) {
  return (function (hot) {
    function CustomBorders() {}
    /** *
     * Current instance (table where borders should be placed)
     */
    var instance = hot;
    
    /**
     * hot plugin enables an option to apply custom borders through the context menu (configurable with context menu key `borders`).
     *
     * To initialize Handsontable with predefined custom borders, provide cell coordinates and border styles in a form of an array.
     *
     * See [Custom Borders](http://docs.handsontable.com/demo-custom-borders.html) demo for more examples.
     *
     * @example
     * ```js
     * ...
     * customBorders: [
     *   {range: {
       *     from: {row: 1, col: 1},
       *     to: {row: 3, col: 4}},
       *     left: {},
       *     right: {},
       *     top: {},
       *     bottom: {}
       *   }
     * ],
     * ...
     *
     * // or
     * ...
     * customBorders: [
     *   {row: 2, col: 2, left: {width: 2, color: 'red'},
     *     right: {width: 1, color: 'green'}, top: '', bottom: ''}
     * ],
     * ...
     * ```
     * @private
     * @class CustomBorders
     * @plugin CustomBorders
     */
    
    /** *
     * Check if plugin should be enabled.
     */
    var checkEnable = function(customBorders) {
      if (typeof customBorders === 'boolean') {
        if (customBorders === true) {
          return true;
        }
      }
      if (typeof customBorders === 'object') {
        if (customBorders.length > 0) {
          return true;
        }
      }
    
      return false;
    };
    
    /** *
     * Initialize plugin.
     */
    var init = function() {
      if (checkEnable(hot.getSettings().customBorders)) {
        if (!hot.customBorders) {
          instance = hot;
          hot.customBorders = new CustomBorders();
        }
      }
    };
    
    /** *
     * Get index of border from the settings.
     *
     * @param {String} className
     * @returns {Number}
     */
    var getSettingIndex = function(className) {
      for (var i = 0; i < instance.view.wt.selections.length; i++) {
        if (instance.view.wt.selections[i].settings.className == className) {
          return i;
        }
      }
    
      return -1;
    };
    
    /** *
     * Insert WalkontableSelection instance into Walkontable settings.
     *
     * @param border
     */
    var insertBorderIntoSettings = function(border) {
      var coordinates = {
        row: border.row,
        col: border.col
      };
      var selection = new Selection(border, new CellRange(coordinates, coordinates, coordinates));

      var index = getSettingIndex(border.className);
      selection.settings = {
        className: border.className,
        border: {
          color: '#68ccff',
          cornerVisible: false,
          width: 2
        },
        bottom: {hide: selection.settings.bottom.hide},
        top: {hide: selection.settings.top.hide},
        left: {hide: selection.settings.left.hide},
        right: {hide: selection.settings.right.hide}
      }
      if (index >= 0) {
        instance.view.wt.selections[index] = selection;
      } else {
        instance.view.wt.selections.push(selection);
      }
    };
    
    /** *
     * Prepare borders from setting (single cell).
     *
     * @param {Number} row Visual row index.
     * @param {Number} col Visual column index.
     * @param borderObj
     */
    var prepareBorderFromCustomAdded = function(row, col, borderObj) {
      var border = createEmptyBorders(row, col);
      border = extendDefaultBorder(border, borderObj);
      hot.setCellMeta(row, col, 'borders', border);
    
      insertBorderIntoSettings(border);
    };
    
    /** *
     * Prepare borders from setting (object).
     *
     * @param {Object} rowObj
     */
    var prepareBorderFromCustomAddedRange = function(rowObj) {
      var range = rowObj.range;
    
      for (var row = range.from.row; row <= range.to.row; row++) {
        for (var col = range.from.col; col <= range.to.col; col++) {
          var border = createEmptyBorders(row, col);
          var add = 0;
    
          if (row == range.from.row) {
            add++;
    
            if (hasOwnProperty(rowObj, 'top')) {
              border.top = rowObj.top;
            }
          }
    
          if (row == range.to.row) {
            add++;
    
            if (hasOwnProperty(rowObj, 'bottom')) {
              border.bottom = rowObj.bottom;
            }
          }
    
          if (col == range.from.col) {
            add++;
    
            if (hasOwnProperty(rowObj, 'left')) {
              border.left = rowObj.left;
            }
          }
    
          if (col == range.to.col) {
            add++;
    
            if (hasOwnProperty(rowObj, 'right')) {
              border.right = rowObj.right;
            }
          }
    
          if (add > 0) {
            hot.setCellMeta(row, col, 'borders', border);
            insertBorderIntoSettings(border);
          }
        }
      }
    };
    
    /** *
     * Create separated class name for borders for each cell.
     *
     * @param {Number} row Visual row index.
     * @param {Number} col Visual column index.
     * @returns {String}
     */
    var createClassName = function(row, col) {
      return `border_row${row}col${col}`;
    };
    
    /** *
     * Create default single border for each position (top/right/bottom/left).
     *
     * @returns {Object} `{{width: number, color: string}}`
     */
    var createDefaultCustomBorder = function() {
      return {
        width: 2,
        color: '#5ba6fe'
      };
    };
    
    /** *
     * Create default object for empty border.
     *
     * @returns {Object} `{{hide: boolean}}`
     */
    var createSingleEmptyBorder = function() {
      return {
        hide: true
      };
    };
    
    /** *
     * Create default Handsontable border object.
     *
     * @returns {Object} `{{width: number, color: string, cornerVisible: boolean}}`
     */
    var createDefaultHtBorder = function() {
      return {
        width: 1,
        color: '#000',
        cornerVisible: false,
      };
    };
    
    /** *
     * Prepare empty border for each cell with all custom borders hidden.
     *
     * @param {Number} row Visual row index.
     * @param {Number} col Visual column index.
     * @returns {Object} `{{className: *, border: *, row: *, col: *, top: {hide: boolean}, right: {hide: boolean}, bottom: {hide: boolean}, left: {hide: boolean}}}`
     */
    var createEmptyBorders = function(row, col) {
      return {
        className: createClassName(row, col),
        border: createDefaultHtBorder(),
        row,
        col,
        top: createSingleEmptyBorder(),
        right: createSingleEmptyBorder(),
        bottom: createSingleEmptyBorder(),
        left: createSingleEmptyBorder(),
      };
    };
    
    var extendDefaultBorder = function(defaultBorder, customBorder) {
      if (hasOwnProperty(customBorder, 'border')) {
        defaultBorder.border = customBorder.border;
      }
    
      if (hasOwnProperty(customBorder, 'top')) {
        defaultBorder.top = customBorder.top;
      }
    
      if (hasOwnProperty(customBorder, 'right')) {
        defaultBorder.right = customBorder.right;
      }
    
      if (hasOwnProperty(customBorder, 'bottom')) {
        defaultBorder.bottom = customBorder.bottom;
      }
    
      if (hasOwnProperty(customBorder, 'left')) {
        defaultBorder.left = customBorder.left;
      }
    
      return defaultBorder;
    };
    
    /**
     * Remove borders divs from DOM.
     *
     * @param borderClassName
     */
    var removeBordersFromDom = function(borderClassName) {
      var borders = document.querySelectorAll(`.${borderClassName}`);
    
      for (var i = 0; i < borders.length; i++) {
        if (borders[i]) {
          if (borders[i].nodeName != 'TD') {
            var parent = borders[i].parentNode;
    
            if (parent.parentNode) {
              parent.parentNode.removeChild(parent);
            }
          }
        }
      }
    };
    
    /** *
     * Remove border (triggered from context menu).
     *
     * @param {Number} row Visual row index.
     * @param {Number} col Visual column index.
     */
    var removeAllBorders = function(row, col) {
      var borderClassName = createClassName(row, col);
      removeBordersFromDom(borderClassName);
      hot.removeCellMeta(row, col, 'borders');
      hot.view.wt.selections.some((item, index) => {
        if (item.settings.className === borderClassName) {
          hot.view.wt.selections.splice(index, 1)
          return true
        }
        return false
      })
    };
    
    /** *
     * Set borders for each cell re. to border position
     *
     * @param row Visual row index.
     * @param col Visual column index.
     * @param place
     * @param remove
     */
    var setBorder = function(row, col, place, remove) {
    
      var bordersMeta = hot.getCellMeta(row, col).borders;
    
      if (!bordersMeta || bordersMeta.border == undefined) {
        bordersMeta = createEmptyBorders(row, col);
      }
    
      if (remove) {
        bordersMeta[place] = createSingleEmptyBorder();
      } else {
        bordersMeta[place] = createDefaultCustomBorder();
      }
    
      hot.setCellMeta(row, col, 'borders', bordersMeta);
    
      var borderClassName = createClassName(row, col);
      removeBordersFromDom(borderClassName);
      insertBorderIntoSettings(bordersMeta);
      setTimeout(() => {
        hot.render();
      }, 0);
      
    };
    
    /** *
     * Prepare borders based on cell and border position
     *
     * @param range
     * @param place
     * @param remove
     */
    var prepareBorder = function(range, place, remove) {
    
      if (range.from.row == range.to.row && range.from.col == range.to.col) {
        if (place == 'noBorders') {
          removeAllBorders.call(hot, range.from.row, range.from.col);
        } else {
          setBorder.call(hot, range.from.row, range.from.col, place, remove);
        }
      } else {
        switch (place) {
          case 'noBorders':
            for (var column = range.from.col; column <= range.to.col; column++) {
              for (var row = range.from.row; row <= range.to.row; row++) {
                removeAllBorders.call(hot, row, column);
              }
            }
            break;
          case 'top':
            for (var topCol = range.from.col; topCol <= range.to.col; topCol++) {
              setBorder.call(hot, range.from.row, topCol, place, remove);
            }
            break;
          case 'right':
            for (var rowRight = range.from.row; rowRight <= range.to.row; rowRight++) {
              setBorder.call(hot, rowRight, range.to.col, place);
            }
            break;
          case 'bottom':
            for (var bottomCol = range.from.col; bottomCol <= range.to.col; bottomCol++) {
              setBorder.call(hot, range.to.row, bottomCol, place);
            }
            break;
          case 'left':
            for (var rowLeft = range.from.row; rowLeft <= range.to.row; rowLeft++) {
              setBorder.call(hot, rowLeft, range.from.col, place);
            }
            break;
          default:
            break;
        }
      }
    };
    
    /** *
     * Check if selection has border by className
     *
     * @param hot
     * @param direction
     */
    var checkSelectionBorders = function(hot, direction) {
      var atLeastOneHasBorder = false;
    
      hot.getSelectedRange().forAll((r, c) => {
        var metaBorders = hot.getCellMeta(r, c).borders;
    
        if (metaBorders) {
          if (direction) {
            if (!hasOwnProperty(metaBorders[direction], 'hide')) {
              atLeastOneHasBorder = true;
              return false; // breaks forAll
            }
          } else {
            atLeastOneHasBorder = true;
            return false; // breaks forAll
          }
        }
      });
      return atLeastOneHasBorder;
    };
    
    /** *
     * Mark label in contextMenu as selected
     *
     * @param label
     * @returns {string}
     */
    var markSelected = function(label) {
      return `<span class="selected">${String.fromCharCode(10003)}</span>${label}`; // workaround for https://github.com/handsontable/handsontable/issues/1946
    };
    
    /** *
     * Add border options to context menu
     *
     * @param defaultOptions
     */
    var addBordersOptionsToContextMenu = function(defaultOptions) {
      if (!hot.getSettings().customBorders) {
        return;
      }
    
      defaultOptions.items.push({
        name: '---------',
      });
      defaultOptions.items.push({
        key: 'borders',
        name: 'Borders',
        disabled() {
          return hot.selection.selectedHeader.corner;
        },
        submenu: {
          items: [
            {
              key: 'borders:top',
              name() {
                var label = 'Top';
                var hasBorder = checkSelectionBorders(hot, 'top');
                if (hasBorder) {
                  label = markSelected(label);
                }
    
                return label;
              },
              callback() {
                var hasBorder = checkSelectionBorders(hot, 'top');
                prepareBorder.call(hot, hot.getSelectedRange(), 'top', hasBorder);
              },
            },
            {
              key: 'borders:right',
              name() {
                var label = 'Right';
                var hasBorder = checkSelectionBorders(hot, 'right');
                if (hasBorder) {
                  label = markSelected(label);
                }
                return label;
              },
              callback() {
                var hasBorder = checkSelectionBorders(hot, 'right');
                prepareBorder.call(hot, hot.getSelectedRange(), 'right', hasBorder);
              },
            },
            {
              key: 'borders:bottom',
              name() {
                var label = 'Bottom';
                var hasBorder = checkSelectionBorders(hot, 'bottom');
                if (hasBorder) {
                  label = markSelected(label);
                }
                return label;
              },
              callback() {
                var hasBorder = checkSelectionBorders(hot, 'bottom');
                prepareBorder.call(hot, hot.getSelectedRange(), 'bottom', hasBorder);
              },
            },
            {
              key: 'borders:left',
              name() {
                var label = 'Left';
                var hasBorder = checkSelectionBorders(hot, 'left');
                if (hasBorder) {
                  label = markSelected(label);
                }
    
                return label;
              },
              callback() {
                var hasBorder = checkSelectionBorders(hot, 'left');
                prepareBorder.call(hot, hot.getSelectedRange(), 'left', hasBorder);
              },
            },
            {
              key: 'borders:no_borders',
              name: 'Remove border(s)',
              callback() {
                prepareBorder.call(hot, hot.getSelectedRange(), 'noBorders');
              },
              disabled() {
                return !checkSelectionBorders(hot);
              }
            }
          ]
        }
      });
    };
    
    var setRowAllBorder = function(row, remove) {
      // todo 计算需要画边框的单元格
      if (!remove) {
        prepareBorder({from: {row: row, col: 0}, to: {row: row, col: hot.countCols() - 1}}, 'top', remove)
        prepareBorder({from: {row: row, col: 0}, to: {row: row, col: hot.countCols() - 1}}, 'left', remove)
        prepareBorder({from: {row: row, col: 0}, to: {row: row, col: hot.countCols() - 1}}, 'right', remove)
        prepareBorder({from: {row: row, col: 0}, to: {row: row, col: hot.countCols() - 1}}, 'bottom', remove)
      } else {
        prepareBorder({from: {row: row, col: 0}, to: {row: row, col: hot.countCols() - 1}}, 'noBorders')
      }

    }

    return {
      setBorder,
      setRowAllBorder
    }
  })(hot)
})

