class Timer {
    constructor () {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.startTime) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    start () {
      if (this.isRunning) {
        return console.log('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    stop () {
      if (!this.isRunning) {
        return console.log('Timer is already stopped');
      }
  
      this.isRunning = false;
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    getTime () {
      if (!this.startTime) {
        return 0;
      }
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
  
      return this.overallTime;
    }
  }
