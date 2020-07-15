import React, { useState, useEffect } from 'react';
import WaterfallControl from '../controller/waterfall';

interface WaterfallProps {
    data: Array<any>,
    col: number,
    childRender: any
}
/* 
    瀑布流：图片需要从cdn下载，所以不能实时获取到图片宽高

    已知获取图片宽高的方法
    1. 限制图片宽高
    2. 已知图片宽高
    3. 等待图片加载获取宽高

    
*/
function Waterfall({ data, col = 2, childRender}: WaterfallProps) {

    let refFlag: Array<HTMLDivElement | any> = [];
    
    const len = data.length;
    const initColData = Array(col).fill('col').map(() => []) as Array<Array<any>>;
    const [colData, setCol] = useState(initColData);

    const waterfallControl = new WaterfallControl();
    waterfallControl.setData(data);
    waterfallControl.setCol(col);
    
    const [dataManager] = useState(waterfallControl);
    const [curIdx, setCurIdx] = useState(0);

    useEffect(() => {
        const colWidth = refFlag[0].offsetWidth;
        // 通过列的宽度去折合计算图片的宽高
        waterfallControl.setColWidth(colWidth);
    }, [])

    useEffect(() => {
        if (curIdx < len - 1) {
            dataManager.pushDataToLowCol(refFlag);
            setCol(dataManager.getColData());
            setCurIdx(dataManager.getCurIdx());
        }
    }, [curIdx])

    return <div className="zui-waterfall zui-clearfix">
        {
            colData.map((val, idx) => <div key={idx}
                className="zui-waterfall-col"
                style={{
                    width: 100/col + '%'
                }}>
                {
                    val.map((sub, subIdx) => <div key={`${idx}-${subIdx}`}
                        className="zui-waterfall-item">
                        <img
                            style={{
                                width: sub.width + 'px',
                                height: sub.height + 'px'
                            }}
                            className="zui-waterfall-img"
                            src={sub.url}
                        />
                        {/* 子模块可以自定义 */}
                        { 
                            typeof childRender === 'function' ?
                                childRender(sub) :
                                <div>{sub.txt}</div>
                        }
                    </div>)
                }
                <div ref={ele => refFlag[idx] = ele}></div>
            </div>)
        }
    </div>
}

export default Waterfall;
