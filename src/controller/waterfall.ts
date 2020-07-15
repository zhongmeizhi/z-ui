
class WaterfallControl {

    data: Array<any>;
    // len: number;
    colData: Array<Array<any>>;
    col: number;
    curIdx: number;
    colWidth: number;

    constructor() {
        this.data = [];
        // this.len = 0;
        this.colData = [];
        this.col = 0;
        this.curIdx = 0;
        this.colWidth = 0;
    }

    getColData() {
        return this.colData;
    }

    getCurIdx(): number {
        return this.curIdx;
    }

    setColWidth(width: number) {
        this.colWidth = width;
    }

    setCol(col: number) {
        this.col = col;
    }

    setData(data: Array<any>) {
        this.data = data;
        // this.len = data.length;
    }
    
    addCurIdx(num = 1) {
        this.curIdx += num; 
    }

    _findLowCol(elements: Array<HTMLDivElement>) {
        const heightList = elements.map(ele => ele.offsetTop);
        const miniHeight = Math.min(...heightList);
        const targetIdx = heightList.indexOf(miniHeight);
        return targetIdx;
    }

    _formatSize(width: number, height: number) {
        const rate = this.colWidth / width;
        return {
            width: this.colWidth,
            height: height * rate
        }
    }

    pushDataToLowCol(elements: Array<HTMLDivElement>) {
        const targetIdx = this._findLowCol(elements);
        this.addCurIdx();
        if (!this.colData[targetIdx]) {
            this.colData = this.data.slice(0, this.col).map(val => []);
        }
        let target = this.data[this.curIdx];
        const size = this._formatSize(target.width, target.height);
        target.width = size.width;
        target.height = size.height;
        this.colData[targetIdx].push(target);
    }
}

export default WaterfallControl;