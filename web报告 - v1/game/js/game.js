var divy = new Array();
var sum = 0, lastx = 0, lasty = 0, l_rnum = 0, o_dnum = 0, sum = 0, clickedimg = "",
    left_x = 0, left_y = 0, up_x = 0, up_y = 0;
var img_lib = new Array("阿渣1.png", "阿渣2.jpg", "阿渣3.jpg", "阿渣4.jpg", "阿渣5.png");
var imgdata = new Array();
var vis = new Array(); 
var _clickedimg = new Array();
function init() {
    
    for (var i = 0; i < 7; i++) {
        imgdata[i] = new Array();
        for (var j = 0; j < 7; j++) {
            imgdata[i][j] = "";
        }
    }
    for (var i = 0; i < 7; i++) {
        vis[i] = new Array();
        for (var j = 0; j < 7; j++) {
            vis[i][j] = 0;
        }
    }
    var x = document.getElementById("box");
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            imgdata[i][j] = parseInt(Math.random() * 10) % 5;
            x.innerHTML += "<div onclick=exchange(this," + i + "," + j + ")><img src=" + img_lib[imgdata[i][j]] + "></div>";
        }
    }
    scanallimgs();
}
function exchange(obj, x, y) {
    var n = 0, m = 0;
    if (sum == 0) {
        lastx = x;//把第一次点击的照片存起来，方便后面的画图，不然找不到上一次点击的图片是什么
        lasty = y;
    }
    _clickedimg[sum] = imgdata[x][y]; 
    sum++;
    if (sum >= 2 && lastx == x && lasty == y) sum = 1; 
    if (sum == 2) {
        if (imgdata[x][y] == imgdata[lastx][lasty]) {
            alert("它们长一样，待在原来地方就好！！");
        }
        else if (lastx == x || lasty == y) {
            if (Math.abs(lasty - y) == 1 || Math.abs(lastx - x) == 1) {
                imgdata[x][y] = _clickedimg[0];
                imgdata[lastx][lasty] = _clickedimg[1];
                divy = document.getElementsByTagName("div");
                obj.innerHTML = '<img src="' + img_lib[imgdata[x][y]] + '">';
                divy[lastx * 7 + lasty + 1].innerHTML = '<img src="' + img_lib[imgdata[lastx][lasty]] + '">';
                n = scan(x, y);         
                m = scan(lastx, lasty);
                if (n == 1 || m == 1) {   //只要其中一个可以消除，就满足交换
                    sum = 0;
                    _clickedimg[0] = _clickedimg[1] = 0;
                    removeimg();           
                    // "消除成功。
                    addimg();              
                    scanallimgs();         
                } else {
                    
                    imgdata[x][y] = _clickedimg[1];
                    imgdata[lastx][lasty] = _clickedimg[0];
                    _clickedimg[0] = _clickedimg[1] = 0;
                    divy = document.getElementsByTagName("div");
                    obj.innerHTML = '<img src="' + img_lib[imgdata[x][y]] + '">';
                    divy[lastx * 7 + lasty + 1].innerHTML = '<img src="' + img_lib[imgdata[lastx][lasty]] + '">';
                    sum = 0;
                    //它们不能消除。交换失败。
                    l_rnum = 0;
                    o_dnum = 0;
                }

            } else {
                //这两只不相邻。   //在同行或者同列不相邻
                sum = 0;
            }
        } else {
            //这两只不相邻。  //不在同行也不在同列相邻
            sum = 0;
        }
    }
}


function scan(x, y) {
    clickedimg = img_lib[imgdata[x][y]];
    var scan_lr = 1, scan_ud = 1;
    left_x = x;
    left_y = y;
    up_x = x;
    up_y = y;
    
    if (y != 0 && img_lib[imgdata[x][y - 1]] == clickedimg && vis[x][y - 1] > 0) {
        scan_lr = 0;
    }
    
    if (x != 0 && img_lib[imgdata[x - 1][y]] == clickedimg && vis[x - 1][y] > 0) {
        scan_od = 0;
    }
    if (scan_lr == 1) {
        for (var a = 0; ; a++) {
            if (y - a < 0 || img_lib[imgdata[x][y - a]] != clickedimg) {
                break;
            } else if (img_lib[imgdata[x][y - a]] == clickedimg) { 
                vis[x][y - a]++;
                l_rnum++;
                if (a != 0) left_y--;
            }
        }
        for (var a = 1; ; a++) {
            if (y + a > 6 || img_lib[imgdata[x][y + a]] != clickedimg) break;
            else if (img_lib[imgdata[x][y + a]] == clickedimg) { 
                vis[x][y + a]++;
                l_rnum++;
            }
        }

        
        if (l_rnum < 3) {
            for (var i = 0; i < l_rnum; i++) {
                vis[left_x][left_y + i] = vis[left_x][left_y + i] - 1;
            }
            l_rnum = 0;
        }
    }
    if (scan_ud == 1) {
        for (var b = 0; ; b++) {
            if (x - b < 0 || img_lib[imgdata[x - b][y]] != clickedimg) {
                break;
            }
            else if (img_lib[imgdata[x - b][y]] == clickedimg) { 
                vis[x - b][y]++;
                o_dnum++;
                if (b != 0) up_x--;
            }

        }
        for (var b = 1; ; b++) {
            if (x + b > 6 || img_lib[imgdata[x + b][y]] != clickedimg) break;
            else if (img_lib[imgdata[x + b][y]] == clickedimg) { 
                vis[x + b][y]++;
                o_dnum++;
            }
        }
    
        if (o_dnum < 3) {
            for (var j = 0; j < o_dnum; j++) {
                vis[up_x + j][up_y] = vis[up_x + j][up_y] - 1;
            }
            o_dnum = 0;
        }
    }
    if (l_rnum >= 3 || o_dnum >= 3) {   
        l_rnum = 0;
        o_dnum = 0;
        return 1;
    } else {
        l_rnum = 0;
        o_dnum = 0;
        return 0;
    }
}


function addimg() {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (imgdata[i][j] == 9) {
                imgdata[i][j] = parseInt(Math.random() * 10) % 5;  
                divy = document.getElementsByTagName("div");
                _divnum = i * 7 + 1 + j;
                divy[_divnum].innerHTML = '<img src="' + img_lib[imgdata[i][j]] + '">';
            }
        }
    }
}


function removeimg() {
    var flag = 0;
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            if (vis[i][j] > 0) {         
                vis[i][j] = 0;
                imgdata[i][j] = 9;
                divy = document.getElementsByTagName("div");
                _divnum = i * 7 + 1 + j;
                divy[_divnum].innerHTML = '<img src="' + "" + '">';
                flag = 1;
            }
        }
    }
    return flag;
}


function scanallimgs() {
    var c = 0,
        s = 1;
    while (s != 0) {  
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                scan(i, j);
            }
        }
        s = removeimg();
        addimg();
    }
}
 