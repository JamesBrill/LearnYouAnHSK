var createWordList = function (initialHskVersion) {
	var activeHskVersions = [];
  activeHskVersions[initialHskVersion] = true;

  return {
    toggleHskVersion : function (versionNumber) {
    	activeHskVersions[versionNumber] = !activeHskVersions[versionNumber];
    },
    isHskVersionActive : function (versionNumber) {
    	return activeHskVersions[versionNumber];
    }
  };
}
