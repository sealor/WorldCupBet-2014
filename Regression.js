function Regression(matrixX, matrixY) {
	var meanValueHelperMatrixX = Matrix.createMatrixByDimension(matrixX.height, 1, 1 / matrixX.height);
	var meanValueHelperMatrixY = Matrix.createMatrixByDimension(matrixY.height, 1, 1 / matrixY.height);

	this.meanValueXVector = matrixX.transpose().multiply(meanValueHelperMatrixX).transpose();
	this.meanValueYVector = matrixY.transpose().multiply(meanValueHelperMatrixY).transpose();

	var matrixTmp;
	matrixTmp = Matrix.createMatrixByVector(matrixX.height, this.meanValueXVector.matrixArray[0]);
	matrixTmp = matrixTmp.forEachCell(function(value, y, x) { return value * -1; });
	this.zStdMatrixX = matrixX.add(matrixTmp);
	matrixTmp = this.zStdMatrixX.forEachCell(function(value, y, x) { return value * value; });
	matrixTmp = matrixTmp.transpose().multiply(meanValueHelperMatrixX).transpose();
	this.standardDeviationXVector = matrixTmp.forEachCell(function(value, y, x) { return Math.sqrt(value); });
	matrixTmp = Matrix.createMatrixByVector(matrixX.width, this.standardDeviationXVector.matrixArray[0]);
	matrixTmp = matrixTmp.forEachCell(function(value, y, x) { return 1 / value; });
	matrixTmp = matrixTmp.forEachCell(function(value, y, x) { return (y === x) ? value : 0; });
	this.zStdMatrixX = this.zStdMatrixX.multiply(matrixTmp);

	matrixTmp = Matrix.createMatrixByVector(matrixY.height, this.meanValueYVector.matrixArray[0]);
	matrixTmp = matrixTmp.forEachCell(function(value, y, x) { return value * -1; });
	this.zStdMatrixY = matrixY.add(matrixTmp);
	matrixTmp = this.zStdMatrixY.forEachCell(function(value, y, x) { return value * value; });
	matrixTmp = matrixTmp.transpose().multiply(meanValueHelperMatrixY).transpose();
	this.standardDeviationYVector = matrixTmp.forEachCell(function(value, y, x) { return Math.sqrt(value); });
	matrixTmp = Matrix.createMatrixByVector(matrixY.width, this.standardDeviationYVector.matrixArray[0]);
	matrixTmp = matrixTmp.forEachCell(function(value, y, x) { return 1 / value; });
	matrixTmp = matrixTmp.forEachCell(function(value, y, x) { return (y === x) ? value : 0; });
	this.zStdMatrixY = this.zStdMatrixY.multiply(matrixTmp);
}

Regression.prototype.solve = function() {
	var transposedMatrixX = this.zStdMatrixX.transpose();
	var result;

	result = transposedMatrixX.multiply(this.zStdMatrixX);
	result = result.inverse();
	result = result.multiply(transposedMatrixX);
	result = result.multiply(this.zStdMatrixY);
	result = result.transpose();

	// https://onlinecourses.science.psu.edu/stat501/node/59
	// http://www.youtube.com/watch?v=uBRXqlZr11I
	var standardDeviationYVector = this.standardDeviationYVector;
	var standardDeviationXVector = this.standardDeviationXVector;
	result = result.forEachCell(function(value, y, x) {
		value *= standardDeviationYVector.matrixArray[0][0];
		value /= standardDeviationXVector.matrixArray[y][x];
		return value;
	});

	var b0 = this.meanValueYVector.matrixArray[0][0] - result.multiply(this.meanValueXVector.transpose()).matrixArray[0][0];
	result.matrixArray[0].unshift(b0);

	return result;
}
