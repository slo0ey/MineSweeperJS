exports.MineSweeper = function(){
    function MineSweeper(x, y, b){
        if(x < 2 || y < 2 || b < 1) throw new TypeError("가로세로는 각각 2이상, 폭탄은 1개이상 설정해주세요.");
        if(!x || !y || !b) throw new TypeError("정의되지 않았습니다.");
        
        this.x = x|0;
        this.y = y|0;
        this.size = this.x * this.y;
        this.b = b|0;
        this.table = new Array(this.size);
        this.log = [];
        this.startAt = 0;
        this.endAt = 0;
        for(var i = 0; i < this.size; i++){
            this.table[i] = {
                tile: 0,
                flag: false,
                opened: false
            };
        }
    }

    MineSweeper.prototype.valid = function(c){
        let [cx, cy] = [m%this.y, (m/this.y)|0];
        return (cx >= 0 && cx < this.x && cy >= 0 && cy < this.y);
    }

    MineSweeper.BOMB = 'b';
    MineSweeper.ALREADY_OPENED = -1;
    MineSweeper.DIE = -2;
    

    MineSweeper.prototype.setMine = function(){
        let bs = "0".repeat(this.size).split("").map((v, i) => i);
        let mx = this.x;
        
        (function shuffle(){
            var tmp;
            for(var k = bs.length-1; k > 0; k--){
                var k2 = (Math.random() * (k+1))|0;
                tmp = bs[k]; bs[k] = bs[k2]; bs[k2] = tmp;
            }//kakaotalk
        }).bind(this)();
        
        bs = bs.slice(0, this.b);
        Api.showToast(bs);
        
        for(var m of bs){
            this.table[m].tile = MineSweeper.BOMB; 
            let [nx, ny] = [m%this.y, (m/this.y)|0];
            
            this.valid(m-mx-1) && (this.table[m-mx-1]+=1);
            this.valid(m-mx) && (this.table[m-mx]+=1);
            this.valid(m-mx+1) && (this.table[m-mx+1]+=1);
            this.valid(m-1) && (this.table[m-1]+=1);
            this.valid(m+1) && (this.table[m+1]+=1);
            this.valid(m+mx-1) && (this.table[m+mx-1]+=1);
            this.valid(m+mx) && (this.table[m+mx]+=1);
            this.valid(m+mx+1) && (this.table[m+mx+1]+=1);
        }
    }

    MineSweeper.prototype.start = function() {
        this.startAt = Date.now();
        return true;
    }

    MineSweeper.prototype.end = function(){
        this.endAt = Date.now();
        return true;
    }

    MineSweeper.prototype.open = function(x, y){
        if(!this.startAt || this.endAt) throw new Error("지금은 타일을 열 수 없습니다.");
        if(x < 1 || y < 1 || x > this.x || y > this.y) throw new Error("유효하지 않는 범위입니다.");

        var c = ((y-1) * this.x) + (x-1);
        var ct = this.table[c];
        
        if(ct.opened){
            if(ct.tile == 0) return MineSweeper.ALREADY_OPENED;
            else {
                var count = 0;
            }
        }
        else if(ct.tile == MineSweeper.BOMB){
            this.end();
            return MineSweeper.DIE;
        }
        else{//kakaotalk
            this.table[c].opened = true;
            if(ct.tile === 0){
                this.open(x-1, y-1);
                this.open(x, y-1);
                this.open(x+1, y-1);
                this.open(x-1, y);
                this.open(x+1, y);
                this.open(x-1, y+1);
                this.open(x, y+1);
                this.open(x+1, y+1);
            }
        }
    }

    MineSweeper.prototype.toString = function(){
        return "-- MineSweeper Info --\n"+
        "\n"+
        "X: "+this.x+"\n"+
        "Y: "+this.y+"\n"+
        "Bomb: "+this.b+"\n"+
        "Table: \n\n"+this.table.reduce((ac, cv, ci) => ac += ci !== 0 && ci%this.x == 0 ? "\n"+cv.tile : cv.tile, "")+"\n\n"+
        "StartAt: " + this.startAt+
        "EndAt:"+this.endAt;
    }

    return MineSweeper;
}
