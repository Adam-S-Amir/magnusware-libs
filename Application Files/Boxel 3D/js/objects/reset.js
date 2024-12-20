class Reset extends Cube {
    constructor(options = {}) {
        super(options);
        this.body.class = 'reset';

        // Add sensor and parts
        this.hitbox.isSensor = true;
        this.sensor = Matter.Bodies.rectangle(0, 0, options.scaleX, options.scaleY, { isSensor: true, density: 0, class: 'sensor' });
        Matter.Body.setParts(this.body, [this.hitbox, this.sensor]);

        this.setScale({ x: 16, y: 16, z: 16 });
        this.shapes.removeAllShapes();
        this.addShapes(options);
    }

    addShapes(options) {
        var count = 3;
        var u = (options.scaleZ * (1 / count)); // unit size
        var start = -Math.floor(count / 2);
        var end = Math.ceil(count / 2);
        var index = 0;
        for (var z = start; z < end; z++) {
            for (var y = start; y < end; y++) {
                for (var x = start; x < end; x++) {
                    if (index % 2 != 0) {
                        this.shapes.addCube({ x: (u * x), y: (u * y), z: (u * z), scaleX: (u * 1), scaleY: (u * 1), scaleZ: (u * 1), color: '#0287ef' });
                    }
                    index++;
                }
            }
        }
    }
}