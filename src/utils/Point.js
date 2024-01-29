export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  scalarMult(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }
  perpendicular() {
    var x = this.x;
    this.x = -this.y;
    this.y = x;
    return this;
  }

  invert() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    var mod = this.length();
    this.x /= mod;
    this.y /= mod;
    return this;
  }

  angle() {
    return this.y / this.x;
  }
  static Angle(p0, p1){
    return Math.atan2( p1.x-p0.x, p1.y-p0.y ) ;
  }
  static Add(p0, p1){
    return new Point(p0.x + p1.x, p0.y + p1.y);
  }
  static Sub(p1, p0){
    return new Point(p1.x - p0.x, p1.y - p0.y);
  }
  static Middle(p0, p1){
    return Point.Add(p0, p1).scalarMult(.5);
  }
}