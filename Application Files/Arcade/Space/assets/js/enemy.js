var Enemy = function(image, x, y) {
    this.image = image;

    this.width = this.image.width;
    this.height = this.image.height;

    this.x = x + (80 - this.width) / 2;
    this.y = y;

    //this.speed = 0.5; //game.enemySpeed;

    this.dead = false;
}

Enemy.prototype.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
}

Enemy.prototype.update = function(context) {
    if (this.dead) {
        return
    }

    if (this.x + this.speed() < 40 || this.x + this.width + this.speed() > game.width - 40) {
        this.moveDown(true);
    }
    this.x += this.speed();
    // Shoot missle randomly
    if (Math.random() < EnemyMissileChance) {
        this.shoot();
    }
}

Enemy.prototype.moveDown = function(iterate) {
    this.y += this.height / 2;

    if (iterate === true) {
        game.enemySpeed = -1 * game.enemySpeed;
        if (game.enemySpeed > 0) {
            Math.min(game.enemySpeed += 0.1, 5);
        } else {
            Math.min(game.enemySpeed -= 0.1, -5);
        }
        if (this.y > game.height)
            game.state = 'dead';
        for (var i = 0; i < game.enemies.length; i++) {
            if (game.enemies[i] === this) {
                continue;
            }
            game.enemies[i].moveDown();
        };
    }
}

Enemy.prototype.shoot = function() {
    if (game.missiles.length < 1 || game.missiles[game.missiles.length - 1].y > this.y + this.height + 45) {
        game.missiles[game.missiles.length] = new EnemyMissile(this);
    }
}

Enemy.prototype.die = function() {
    this.dead = true;
    game.score += 10 + game.level;
    game.playSound('invaderkilled');

    enemyAlive = false;
    for (var i = 0; i < game.enemies.length; i++) {
        if (game.enemies[i].dead === false) {
            enemyAlive = true;
            break;
        }
    };
    if (enemyAlive === false) {
        game.nextLevel();
    }
}

Enemy.prototype.speed = function() {
    return game.enemySpeed;
}

Enemy.prototype.collide = function(player) {
    horizontalCollision = (this.x < player.x && player.x < (this.x + this.width)) ||
        (this.x < player.x + player.width && player.x + player.width < this.x + this.width) ||
        (player.x < this.x && this.x + this.width < player.x + player.width)
    verticalCollision = (this.y < player.y && player.y < this.y + this.height) ||
        (this.y < player.y + player.height && player.y + player.height < this.y + this.height) ||
        (player.y < this.y && this.y + this.height < player.y + player.height)

    return horizontalCollision && verticalCollision;
}