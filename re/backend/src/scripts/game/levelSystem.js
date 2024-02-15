var level = 0;
var newLevel = false;

class LevelSystem {
    setLevel(){
        if (newLevel) {
            level++;
        }
    }

    delLevel(){
        level = 0;
    }
}