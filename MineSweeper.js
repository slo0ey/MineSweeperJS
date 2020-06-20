exports.MineSweeper = function(){
    function MineSweeper(x, y, b){
        if(x < 2 || y < 2 || b < 1) throw new TypeError("가로세로는 각각 2이상, 폭탄은 1개이상 설정해주세요.");

        this.x = x|0;
        this.y = y|0;
        this.size = this.x * this.y;
        this.b = b|0;
        if(this.b > this.size) throw new TypeError("폭탄 갯수는 타일크기 이하여야 합니다.");
        this.table = new Array(this.y);
        for(var i = 0; i < this.y; i++){
            this.table[i] = new Array(this.x);
            for(var k = 0; k < this.x; k++){
                this.table[i][k] = {
                    tile: 0,
                    opened: false,
                    flag: false
                }
            }
        }
        this.died = false;
    }

    MineSweeper.around = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    MineSweeper.prototype.safe = function(x, y){
        return x >= 0 && x < this.x && y >= 0 && y < this.y;
    }

    MineSweeper.prototype.division = function(xy){
        return [xy%this.y, xy/this.y];
    }

    MineSweeper.prototype.sum = function(x,  y){
        return x+(y*this.x);
    }

    MineSweeper.prototype.setMine = function(){
        var nums = new Array(this.size);
        for(var i in nums) nums.push(i);
        nums = nums.slice(0, this.b).forEach(v => {
            return this.division(v);
        });

        for(var c in nums){
            var cod = nums[c];
            this.table[cod[1]][cod[0]].tile = 'b';

            for(var a in MineSweeper.around){
                var aro = MineSweeper.around[a];
                var newcod = [cod[0]+aro[0], cod[1]+aro[1]];

                if(this.table[newcod[1]][newcod[0]].tile !== 'b'){
                    this.table[newcod[1]][newcod[0]].tile++;
                }
            }
        }
    }

    MineSweeper.prototype.flag = function(x, y){
        if(x < 0 || y < 0|| x >= this.x || y >= this.y) throw new TypeError("Invalid Coordinate");
        if(!this.table[y][x].opened){
            var f = this.table[y][x].flag;
            this.table[y][x].flag = !f;
        }
    }

    MineSweeper.prototype.open = function(x, y){
        if(x < 0 || y < 0|| x >= this.x || y >= this.y) throw new TypeError("Invalid Coordinate");
        var current = this.table[y][x].tile;

        if(this.table[y][x].opened){
            if(current == 0) return;
            else {
                var count = current;
                var subcount = 0;
                for(var a in MineSweeper.around){
                    var aro = MineSweeper.around[a];
                    var newcod = [x+aro[0], y+aro[1]];
    
                    if(!this.table[newcod[1]][newcod[0]].opened && this.table[newcod[1]][newcod[0]].flag) subcount++;
                }
                if(subcount == count){
                    for(var a in MineSweeper.around){
                        var aro = MineSweeper.around[a];
                        var newcod = [x+aro[0], y+aro[1]];
        
                        if(!this.table[newcod[1]][newcod[0]].opened){
                            this.open(newcod[0], newcod[1]);
                        }
                    }
                }
            }
        } else {
            this.table[y][x].opened = true;
            if(current == 0){
                for(var a in MineSweeper.around){
                    var aro = MineSweeper.around[a];
                    var newcod = [x+aro[0], y+aro[1]];
    
                    if(!this.table[newcod[1]][newcod[0]].opened){
                        this.open(newcod[0], newcod[1]);
                    }
                }
            } else if(current == 'b'){
                this.died = true;
                return -1;
            }
        }
    }

    MineSweeper.prototype.display = function(option){
        var dis = "";
        for(var i = 0; i < this.y; i++){
            dis+="\n";
            for(var k = 0; k < this.x; k++){
                var current = this.table[i][k];
                switch(option){ //0 to normal, 1 to died, 2 to the answer
                    case 0:
                        if(current.opened) dis+=current.tile;
                        else{
                            if(current.flag) dis+='f';
                            else dis+=9;
                        }
                        break;
                    case 1:
                        if((current.opened && current.tile == 'b') || (current.flag && current.tile !== 'b')) dis+='x';
                        else{
                            if(current.flag) dis+='f';
                            else dis+=current.tile;
                        }
                        break;
                    case 2:
                        dis+=current.tile;
                        break;
                    default:
                        dis+=current.tile;
                }
            }
        }
        return dis.substring(1);
    }

    MineSweeper.prototype.toString = function(){
        var display = "";
        for(var i = 0; i < this.y; i++){
            display+="\n";
            for(var k = 0; k < this.x; k++){
                display+=this.table[i][k].tile
            }
        }
        return "-- MineSweeper("+this.x+"x"+this.y+"/"+this.b+") --\n" + display;          
    }

    return MineSweeper;
}