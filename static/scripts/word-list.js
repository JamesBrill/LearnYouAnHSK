function WordList(initialHskVersion) 
{
	this.hskVersions = [initialHskVersion];
}

WordList.prototype.toggleHskVersion = function(versionNumber)
{
	var hsk1Index = $.inArray(versionNumber, this.hskVersions);
	if (hsk1Index == -1)
	{
		this.hskVersions.push(versionNumber);
	}
	else
	{
		this.hskVersions.splice(hsk1Index, 1);
	}
}

WordList.prototype.isHskVersionActive = function(versionNumber)
{
	return $.inArray(versionNumber, this.hskVersions) != -1;
}