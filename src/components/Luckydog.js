import React, {
  Component
} from 'react'
// import Swiper from 'swiper';
import './luckydog.less';

class Luckydog extends Component {

  componentDidMount() {
    new Swiper(this.refs.luckydog, {
      direction: 'vertical',
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    })
  }

  render() {

    const realLucky = [{
      phone: '159****5424',
      prize: 'iphone X'
    }, {
      phone: '139****6919',
      prize: '航拍飞机'
    }, {
      phone: '176****3505',
      prize: '航拍飞机'
    }]
    let luckydogs = []
    const prizeArray = ['升学学习资料', '一对一两节课', '一对一一节课', '悠悠球', '语数英录播课', '变身腰带']
    const prefixArray = ['130', '131', '132', '133', '135', "137", '138', '170', '187', '150']

    for (let i = 0; i < 27; i++) {
      const prefix = prefixArray[parseInt(10 * Math.random())]
      let num = '';
      for (let j = 0; j < 4; j++) {
        num += Math.floor(Math.random() * 10)
      }
      let prizeIndex = parseInt(Math.random() * (6), 10)
      luckydogs.push({
        phone: prefix + '****' + num,
        prize: prizeArray[prizeIndex]
      })
    }
    luckydogs = luckydogs.concat(realLucky)
    luckydogs.sort(function () { return 0.5 - Math.random() })
    // console.log(luckydogs)
    return (
      <div className="inforbox">
        <div className="inforbox-box">
          <div className="inforbox-speaker">
            <div className="icon"></div>
          </div>
          <div className="inforbox-content swiper-container" ref="luckydog">
            <div className="swiper-wrapper">
              {luckydogs.map((comment, index) => (
                <div className="inforbox-item swiper-slide" key={index}>恭喜 {comment.phone} 抽中“{comment.prize}”</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Luckydog
