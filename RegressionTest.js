test("RegressionTest: Z-Transformation", function() {
	var matrixXArray = [];
	matrixXArray.push([28.00, 82.00]);
	matrixXArray.push([37.00, 92.00]);
	matrixXArray.push([37.00,112.00]);
	matrixXArray.push([38.00,100.00]);
	matrixXArray.push([35.00, 88.00]);
	matrixXArray.push([20.00,102.00]);
	matrixXArray.push([39.00, 91.00]);
	matrixXArray.push([61.00,108.00]);
	matrixXArray.push([47.00,101.00]);
	matrixXArray.push([29.00, 98.00]);
	var matrixX = new Matrix(matrixXArray);

	var matrixYArray = [];
	matrixYArray.push([5.00]);
	matrixYArray.push([6.00]);
	matrixYArray.push([11.00]);
	matrixYArray.push([8.00]);
	matrixYArray.push([7.00]);
	matrixYArray.push([10.00]);
	matrixYArray.push([8.00]);
	matrixYArray.push([6.00]);
	matrixYArray.push([5.00]);
	matrixYArray.push([10.00]);
	var matrixY = new Matrix(matrixYArray);

	var regression = new Regression(matrixX, matrixY);
	var expectedMatrixXArray = [
		[-0.860291744573129, -1.763718527152797],
		[-0.009453755434869681, -0.6184467562743567],
		[-0.009453755434869681, 1.672096785482524],
		[0.0850837989138258, 0.29777066042839545],
		[-0.19852886413226062, -1.076555464625733],
		[-1.6165921793626927, 0.5268250146040835],
		[0.17962135326252127, -0.7329739333622008],
		[2.2594475489338217, 1.2139880771311478],
		[0.935921788052085, 0.4122978375162395],
		[-0.7657541902244335, 0.0687163062527074]];

	deepEqual(regression.zStdMatrixX.matrixArray, expectedMatrixXArray);

	var expectedMatrixYArray = [
		[-1.2626716210644433],
		[-0.7770286898858112],
		[1.6511859660073493],
		[0.19425717247145302],
		[-0.2913857587071791],
		[1.1655430348287172],
		[0.19425717247145302],
		[-0.7770286898858112],
		[-1.2626716210644433],
		[1.1655430348287172]];

	deepEqual(regression.zStdMatrixY.matrixArray, expectedMatrixYArray);

	var resultMatrix = regression.solve();

	var expectedMatrixArray = [];
	expectedMatrixArray.push([-4.921044751042272, -0.14655437681027111, 0.18437589456574263]);

	deepEqual(resultMatrix.matrixArray, expectedMatrixArray);
});

test("RegressionTest: solve()", function() {
	var matrixXArray = [];
	matrixXArray.push([1]);
	matrixXArray.push([2]);
	matrixXArray.push([3]);
	var matrixX = new Matrix(matrixXArray);

	var matrixYArray = [];
	matrixYArray.push([1]);
	matrixYArray.push([2]);
	matrixYArray.push([3]);
	var matrixY = new Matrix(matrixYArray);

	var regression = new Regression(matrixX, matrixY);
	var solvedMatrix = regression.solve();

	var expectedMatrixArray = [];
	expectedMatrixArray.push([2.220446049250313e-16, 0.9999999999999999]);

	deepEqual(solvedMatrix.matrixArray, expectedMatrixArray);
});
