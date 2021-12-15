var counter = 10;
var counterInterval;

function outOfTime() {
  if (counterInterval) return;
  E.showMessage("Out of Time","My Timer");
  Bangle.buzz();
  Bangle.beep(200, 4000)
    .then(() => new Promise(resolve => setTimeout(resolve,200)))
    .then(() => Bangle.beep(200, 3000));
  // again, 10 secs later
  setTimeout(outOfTime, 10000);
}

function countDown() {
  counter--;
  // Out of time
  if (counter<=0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    setWatch(startTimer, BTN);
    outOfTime();
    return;
  }

  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("Vector",80); // vector font, 80px  
  // draw the current counter value
  g.drawString(counter,120,120);
  // optional - this keeps the watch LCD lit up
  // Bangle.setLCDPower(0);
}

function startTimer() {
  counter = 100;
  countDown();
  if (!counterInterval)
    counterInterval = setInterval(countDown, 1000);
}

startTimer();
