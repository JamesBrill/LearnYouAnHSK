let createWordList = function (initialHskVersion) {
  let activeHskVersions = [];
  activeHskVersions[initialHskVersion] = true;

  let isHskVersionActive = function (versionNumber) {
    return activeHskVersions[versionNumber];
  }

  return {
    toggleHskVersion : function (versionNumber) {
      activeHskVersions[versionNumber] = !activeHskVersions[versionNumber];
    },
    isHskVersionActive : isHskVersionActive,
    getWordList : function () {
      let requestedVersions = '';
      for (let version in activeHskVersions) {
        if (isHskVersionActive(version)) {
          requestedVersions += version + ',';
        }
      }
      return $.get('/words/' + requestedVersions);
    }
  };
}
