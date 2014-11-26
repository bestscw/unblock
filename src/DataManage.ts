class DataManage {
    public static _rects:Array<any> = [];  //所有的盒子
    public static _data:Array<any> = [];   //所有的数据
    public static _nousedata:Array<any> = [];  //位数用的数据
    public static isRunning:boolean = false;   //是否运行中
    public static mode:number = 0;   //玩法

    public static useBitmap:number = 1;
    public static move_step:number = 0; // 移动步数
    public static move_time:number = 0; // 移动时间
    public static max_level:number = 0; // 关卡上限
    public static current_level:number = 1; // 当前关卡
    public static unlock_level:number = 0; // 最大解锁关卡

    public static stageW:number = 0; // 主场景宽度
    public static stageH:number = 0; // 主场景高度

    public static style:number = 0; // 0 要解锁的木块 1 水平短木块  2 水平长木块 3 垂直短木块 4 垂直长木块
    public static direction:number = 0; // 0 水平移动 1垂直移动
    public static width:number = 0; // 木块宽度
    public static height:number = 0; // 木块高度
    public static ratio:number = 0.8; // 系数

    public static w:number = 0; // 木块容器宽度
    public static h:number = 0; // 木块容器高度
    public static min_width:number = 0;
    public static min_height:number = 0;

    public static current_style:number = 0;
    public static clickSound:egret.Sound;
    public static particle:particle.ParticleSystem;




}