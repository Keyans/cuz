export interface Captcha {
    backgroundImage: string
    backgroundImageHeight: number
    backgroundImageWidth: number
    sliderImage: string
    sliderImageHeight: number
    sliderImageWidth: number
}
export interface CaptchaResponse {
    id: string
    captcha: Captcha
}

export enum TrackType {
    /** 抬起.*/
    UP = 'UP',
    /** 按下.*/
    DOWN = 'DOWN',
    /** 移动.*/
    MOVE = 'MOVE',
    /** 点击.*/
    CLICK = 'CLICK',
}

export interface Track {
    /** x. */
    x: number
    /** y. */
    y: number
    /** 时间. */
    t: number
    /** 类型. */
    type: TrackType
}

export interface ImageCaptchaTrack {
    /** 背景图片宽度. */
    bgImageWidth: number
    /** 背景图片高度. */
    bgImageHeight: number
    /** 滑块图片宽度. */
    sliderImageWidth: number
    /** 滑块图片高度. */
    sliderImageHeight: number
    /** 滑动开始时间. */
    startSlidingTime: string
    /** 滑动结束时间. */
    endSlidingTime: string
    /** 滑动的轨迹. */
    trackList: Array<Track>
    //临时存放开始时间
    startTime: Date
}

/**
 * 浏览器
 */
export interface CaptchaRequest<T> {
    form: T
    id: string
    captchaTrack: ImageCaptchaTrack
    smsType: string
}
