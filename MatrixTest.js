test("MatrixTest: createIdentityMatrix()", function() {
	var matrix = Matrix.createIdentityMatrix(3);

	var expectedMatrixArray = [];
	expectedMatrixArray.push([1, 0, 0]);
	expectedMatrixArray.push([0, 1, 0]);
	expectedMatrixArray.push([0, 0, 1]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: createMatrixByDimension()", function() {
	var matrix = Matrix.createMatrixByDimension(3, 3, -7);

	var expectedMatrixArray = [];
	expectedMatrixArray.push([-7, -7, -7]);
	expectedMatrixArray.push([-7, -7, -7]);
	expectedMatrixArray.push([-7, -7, -7]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: createMatrixByVector()", function() {
	var matrix = Matrix.createMatrixByVector(3, [-7, -8, -9]);

	var expectedMatrixArray = [];
	expectedMatrixArray.push([-7, -8, -9]);
	expectedMatrixArray.push([-7, -8, -9]);
	expectedMatrixArray.push([-7, -8, -9]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: forEachCell()", function() {
	var matrix = Matrix.createMatrixByDimension(3, 3, -7);
	matrix = matrix.forEachCell(function(value, y, x) {
		return value + 1;
	});

	var expectedMatrixArray = [];
	expectedMatrixArray.push([-6, -6, -6]);
	expectedMatrixArray.push([-6, -6, -6]);
	expectedMatrixArray.push([-6, -6, -6]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: clone()", function() {
	var matrix = Matrix.createMatrixByDimension(3, 3, -7);
	matrix = matrix.clone();

	var expectedMatrixArray = [];
	expectedMatrixArray.push([-7, -7, -7]);
	expectedMatrixArray.push([-7, -7, -7]);
	expectedMatrixArray.push([-7, -7, -7]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: transpose()", function() {
	var matrixArray = [];
	matrixArray.push([+1, +8 , -3]);
	matrixArray.push([+4, -2 , +5]);

	var matrix = new Matrix(matrixArray);
	var transposedMatrix = matrix.transpose();

	var expectedMatrixArray = [];
	expectedMatrixArray.push([+1, +4]);
	expectedMatrixArray.push([+8, -2]);
	expectedMatrixArray.push([-3, +5]);

	deepEqual(transposedMatrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: multiply()", function() {
	var matrixArray1 = [];
	matrixArray1.push([+4, +2 , +1]);
	matrixArray1.push([+0, -2 , +4]);
	var matrix1 = new Matrix(matrixArray1);

	var matrixArray2 = [];
	matrixArray2.push([+1, +2 , +3]);
	matrixArray2.push([+0, +4 , +6]);
	matrixArray2.push([+2, -1 , +8]);
	var matrix2 = new Matrix(matrixArray2);

	var matrix = matrix1.multiply(matrix2);

	var expectedMatrixArray = [];
	expectedMatrixArray.push([+6, +15, +32]);
	expectedMatrixArray.push([+8, -12, +20]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: add()", function() {
	var matrixArray1 = [];
	matrixArray1.push([+4, +2 , +1]);
	matrixArray1.push([+0, -2 , +4]);
	var matrix1 = new Matrix(matrixArray1);

	var matrixArray2 = [];
	matrixArray2.push([+1, +2 , +3]);
	matrixArray2.push([+1, +2 , +3]);
	var matrix2 = new Matrix(matrixArray2);

	var matrix = matrix1.add(matrix2);

	var expectedMatrixArray = [];
	expectedMatrixArray.push([+5, +4, +4]);
	expectedMatrixArray.push([+1, +0, +7]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: slice()", function() {
	var matrixArray = [];
	matrixArray.push([+1, +8, -3]);
	matrixArray.push([+4, -2, +5]);
	matrixArray.push([+5, +7, -1]);
	var matrix = new Matrix(matrixArray);

	matrix = matrix.slice(1, 1);

	var expectedMatrixArray = [];
	expectedMatrixArray.push([+1, -3]);
	expectedMatrixArray.push([+5, -1]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: determinate()", function() {
	var matrixArray = [];
	matrixArray.push([+6, +1, +1]);
	matrixArray.push([+4, -2, +5]);
	matrixArray.push([+2, +8, +7]);
	var matrix = new Matrix(matrixArray);

	equal(matrix.determinate(), -306);
});

test("MatrixTest: inverse() (1)", function() {
	var matrixArray = [];
	matrixArray.push([+3, +0, +2]);
	matrixArray.push([+2, +0, -2]);
	matrixArray.push([+0, +1, +1]);
	var matrix = new Matrix(matrixArray);

	matrix = matrix.inverse();

	var expectedMatrixArray = [];
	expectedMatrixArray.push([+0.2, +0.2, +0]);
	expectedMatrixArray.push([-0.2, +0.3, +1]);
	expectedMatrixArray.push([+0.2, -0.3, +0]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: inverse() (2)", function() {
	var matrixArray = [];
	matrixArray.push([+2, -1, +0]);
	matrixArray.push([-1, +2, -1]);
	matrixArray.push([+0, -1, +2]);
	var matrix = new Matrix(matrixArray);

	matrix = matrix.inverse();

	var expectedMatrixArray = [];
	expectedMatrixArray.push([+0.75, +0.5, +0.25]);
	expectedMatrixArray.push([+0.50, +1.0, +0.50]);
	expectedMatrixArray.push([+0.25, +0.5, +0.75]);

	deepEqual(matrix.matrixArray, expectedMatrixArray);
});

test("MatrixTest: integration test", function() {
	var matrixArray = [];
	matrixArray.push([+2, -1, +0]);
	matrixArray.push([-1, +2, -1]);
	matrixArray.push([+0, -1, +2]);
	var matrix = new Matrix(matrixArray);

	var inversedMatrix = matrix.inverse();
	var identityMatrix = matrix.multiply(inversedMatrix);

	var expectedMatrixArray = Matrix.createIdentityMatrix(3);

	deepEqual(identityMatrix.matrixArray, expectedMatrixArray.matrixArray);
});
