var phaseIterator = function (phases, phaseActions) {
  var phaseIndex = 0; 
  return {
    nextPhase : function () {
      phaseIndex = (phaseIndex + 1) % phases.length;
      this.performPhase();
    },
    performPhase : function () {
      phaseActions[phaseIndex]();
    },
    currentPhase : function () {
      return phases[phaseIndex];
    },
    gotoPhase : function (phase) {
      phaseIndex = phases.indexOf(phase);
      this.performPhase();
    }
  }
}