import React, { useEffect } from 'react'
import MySwiper from 'swiper'
import "swiper/css/swiper.css"
import './swiper.scss'
export default function Swiper() {
    useEffect(() => {
        new MySwiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            speed: 500,//动画转化时间

            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
                // reverseDirection:true//反向轮播
            },
            // virtualTranslate: true,
            // autoHeight: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            roundLengths: true,
            on: {
                // slideChange() {
                //     console.log("change")
                // }
            },
            effect: "cube",
            cubeEffect: {
                slideShadows: false,
                shadowOffset: 10
            },
            // virtual: {
            //     slides: self.state.slides,
            //     renderExternal(data) {
            //       // assign virtual slides data
            //       self.setState({
            //         virtualData: data,
            //       });
            //     }
            //   },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            lazy: {
                loadPrevNext: true,
            },
        })
    }, [])
    return (
        <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <img src={require('./img/1.jpg')} alt="" title="图片" />
                </div>
                <div className="swiper-slide">
                    <img src={require('./img/2.jpg')} alt="" title="图片" />
                </div>
                <div className="swiper-slide">
                    <img src={require('./img/3.jpg')} alt="" title="图片" />
                </div>
                <div className="swiper-slide">
                    <img src={require('./img/4.jpg')} alt="" title="图片" />
                </div>
                <div className="swiper-slide">
                    <img src={require('./img/5.jpg')} alt="" title="图片" />
                </div>
            </div>
            {/* 7     <!-- 如果需要分页器 --> */}
            <div className="swiper-pagination">fewfw</div>

            {/* 10     <!-- 如果需要导航按钮 --> */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>

            {/* 14     <!-- 如果需要滚动条 --> */}
            <div className="swiper-scrollbar"></div>
        </div>
    )
}
