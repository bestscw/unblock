var DataManage = (function () {
    function DataManage() {
    }
    DataManage._rects = []; //所有的盒子
    DataManage._data = []; //所有的数据
    DataManage._nousedata = []; //位数用的数据
    DataManage.isRunning = false; //是否运行中
    DataManage.mode = 0; //玩法
    DataManage.useBitmap = 1;
    DataManage.move_step = 0; // 移动步数
    DataManage.move_time = 0; // 移动时间
    DataManage.max_level = 0; // 关卡上限
    DataManage.current_level = 1; // 当前关卡
    DataManage.unlock_level = 0; // 最大解锁关卡
    DataManage.stageW = 0; // 主场景宽度
    DataManage.stageH = 0; // 主场景高度
    DataManage.style = 0; // 0 要解锁的木块 1 水平短木块  2 水平长木块 3 垂直短木块 4 垂直长木块
    DataManage.direction = 0; // 0 水平移动 1垂直移动
    DataManage.width = 0; // 木块宽度
    DataManage.height = 0; // 木块高度
    DataManage.ratio = 0.8; // 系数
    DataManage.w = 0; // 木块容器宽度
    DataManage.h = 0; // 木块容器高度
    DataManage.min_width = 0;
    DataManage.min_height = 0;
    DataManage.current_style = 0;
    return DataManage;
})();
