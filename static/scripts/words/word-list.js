var createWordList = function (initialHskVersion) {
  var activeHskVersions = [];
  activeHskVersions[initialHskVersion] = true;

  var isHskVersionActive = function (versionNumber) {
    return activeHskVersions[versionNumber];
  }

  return {
    toggleHskVersion : function (versionNumber) {
      activeHskVersions[versionNumber] = !activeHskVersions[versionNumber];
    },
    isHskVersionActive : isHskVersionActive,
    getWordList : function () {
      var requestedVersions = '';
      for (var version in activeHskVersions) {
        if (isHskVersionActive(version)) {
          requestedVersions += version + ',';
        }
      }
      return $.get('/words/' + requestedVersions);
    }
  };
}
