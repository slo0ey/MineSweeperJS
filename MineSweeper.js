exports.MineSweeper = function(){
    function MineSweeper(x, y, b){
        if(x < 2 || y < 2 || b < 1) throw new TypeError("가로세로는 각각 2이상, 폭탄은 1개이상 설정해주세요.");

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
            //@DenFade 님 코드 왤케 좆같음?
            //바렛 메봇R 안만듦?커찮 메봇R 열자 ㅋㅋ루
            //ㅅㅄㄲ
            // @DenFade 아니 근데 이거 이렇게 짜도 되는거임?
            //ㄹㅇㅋㅋ  애초에 로직이 ]\]]]맞긴 하
            //맞지않나
            //나이번에 1차원배열로만 해보는거 첨함 

            //ㅇㅇ
            //ㅇ얘들ㅇㅏ 이거 깃헙행이야..
        }
    }

        // https://github.com/mir99712
        // https://github.com/DenFade -> 정상인
        // https://github.com/seuiggi
        // https://github.com/XZI-0
        // https://github.com/foliter
        // https://github.com/jungwoo3179
        //나 타일마다 번호 매겨도 되냐
        //뭐하러 그럼 병신들 www
        //그럼 더 편해지는데 나중에 지울게 ㅇㅇ
        //추상적으로 할려니 존나 힘들어서 sexsexsexangsexsex 
        //아니시밯ㄹ 코붕이들아 잇상한거좀 처히자마라거
        /* BY XZI ________________      ________________    _______          _______
                 /               /     /               /   \       \        /      /
                /     __________/     /     __________/     \       \     /      /
               /     /               /     /                 \       \   /      /
              /     /_________      /     /_________          \       \/       /
             /               /     /               /           \              /
            /_________      /     /     __________/            /              \
                     /     /     /     /                      /       /\       \
           _________/     /     /     /__________            /       /  \       \
          /              /     /                /           /       /    \       \
         /______________/     /________________/           /_______/      \_______\
         
         
                    ________________       ________________      ______________                ________________
                  /                /     /                /    /              /              /                /
                 /      ____      /     /      ____      /    /________      /              /_____      _____/
                /     /    /     /     /     /    /     /            /      /                    /     /
               /     /____/     /     /     /    /     /            /      /                    /     /
              /                /     /     /    /     /            /      /                    /     /
             /      ____      /     /     /    /     /            /      /                    /     /
            /     /    /     /     /     /    /     /            /      /                    /     /
           /     /____/     /     /     /____/     /            /      /__________     _____/     /_____
          /                /     /                /            /                /     /                / 
         /________________/     /________________/            /________________/     /________________/
        */
       //폭동진압
        //sex bozi zazi  좆까라시발라마

        //나참고로 이거그대로 깃헙행이다
        

    MineSweeper.prototype.start = function() {
        this.startAt = Date.now();
    }

    MineSweeper.prototype.end = function(){
        this.endAt = Date.now();
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
        "StartAt: " + this.startAt;
    }

    return MineSweeper;
}
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
 //만든 모듈 응기잇 뿡기잇 짱기잇 응기잇정우가 만든 모듈 응기잇 뿡기잇 짱기잇 응기잇
//진짜 병신이 따로없네 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ수준ㅘ쿠쿠루쿠쿠
//j정우 수준 바렛이상~ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ