function Matrix(matrixArray) {
	this.matrixArray = matrixArray;
	this.height = matrixArray.length;
	this.width = matrixArray[0].length;
}

Matrix.createIdentityMatrix = function(size) {
	var matrixArray = [];

	for (var y = 0; y < size; y++) {
		matrixArray[y] = [];

		for (var x = 0; x < size; x++) {
			if (x == y) {
				matrixArray[y][x] = 1;
			} else {
				matrixArray[y][x] = 0;
			}
		}
	}

	return new Matrix(matrixArray);
}

Matrix.createMatrixByDimension = function(height, width, value) {
	var matrixArray = [];

	for (var y = 0; y < height; y++) {
		matrixArray[y] = [];

		for (var x = 0; x < width; x++) {
			matrixArray[y][x] = value;
		}
	}

	return new Matrix(matrixArray);
}

Matrix.createMatrixByVector = function(height, vectorArray) {
	var matrixArray = [];

	for (var y = 0; y < height; y++) {
		matrixArray[y] = [];

		for (var x = 0; x < vectorArray.length; x++) {
			matrixArray[y][x] = vectorArray[x];
		}
	}

	return new Matrix(matrixArray);
}

Matrix.prototype.forEachCell = function(callback) {
	var newMatrixArray = [];
	for(var y = 0; y < this.height; y++) {
		newMatrixArray[y] = [];

		for (var x = 0; x < this.width; x++) {
			newMatrixArray[y][x] = callback(this.matrixArray[y][x], y, x);
		}
	}

	return new Matrix(newMatrixArray);
}

Matrix.prototype.clone = function() {
	return this.forEachCell(function(value, y, x) { return value; });
}

Matrix.prototype.transpose = function() {
	var transposedArray = [];
	for (var x = 0; x < this.width; x++) {
		transposedArray[x] = [];

		for(var y = 0; y < this.height; y++) {
			transposedArray[x][y] = this.matrixArray[y][x];
		}
	}

	return new Matrix(transposedArray);
}

Matrix.prototype.multiply = function(matrix) {
	var multipliedArray = [];
	for (var y = 0; y < this.height; y++) {
		multipliedArray[y] = [];

		for (var x = 0; x < matrix.width; x++) {
			var sum = 0;

			for (var i = 0; i < matrix.height; i++) {
				sum += this.matrixArray[y][i] * matrix.matrixArray[i][x];
			}

			multipliedArray[y][x] = sum;
		}
	}

	return new Matrix(multipliedArray);
}

Matrix.prototype.add = function(matrix) {
	var addedArray = [];
	for (var y = 0; y < this.height; y++) {
		addedArray[y] = [];

		for (var x = 0; x < matrix.width; x++) {
			addedArray[y][x] = this.matrixArray[y][x] + matrix.matrixArray[y][x];
		}
	}

	return new Matrix(addedArray);
}

Matrix.prototype.slice = function(rowNumber, colNumber) {
	var matrixArray;
	matrixArray = this.matrixArray.slice(0, rowNumber);
	matrixArray = matrixArray.concat(this.matrixArray.slice(rowNumber + 1, this.width + 1));

	for (var i = 0; i < matrixArray.length; i++) {
		var oldMatrixArray = matrixArray[i];
		var tmpMatrixArray = oldMatrixArray.slice(0, colNumber);
		matrixArray[i] = tmpMatrixArray.concat(oldMatrixArray.slice(colNumber + 1, this.height + 1));
	}

	return new Matrix(matrixArray);
}

Matrix.prototype.determinate = function() {
	if (this.width == 1 && this.height == 1) {
		return this.matrixArray[0][0];
	} else if (this.width == 2 && this.height == 2) {
		return this.matrixArray[0][0] * this.matrixArray[1][1] - this.matrixArray[0][1] * this.matrixArray[1][0];
	}

	var determinate = 0;

	for (var i = 0; i < this.width; i++) {
		var factor = i % 2 === 0 ? 1 : -1;
		determinate += factor * this.matrixArray[0][i] * this.slice(0, i).determinate();
	}

	return determinate;
}

Matrix.prototype.inverse = function() {
	if (this.width == 1 && this.height == 1) {
		return new Matrix([[ 1 / this.matrixArray[0][0] ]]);
	}

	var inversedArray = [];
	var determinate = this.determinate();

	for (var y = 0; y < this.height; y++) {
		inversedArray[y] = [];

		for (var x = 0; x < this.width; x++) {
			var factor = (x + y) % 2 === 0 ? 1 : -1;
			inversedArray[y][x] = factor * this.slice(x, y).determinate() / determinate;
		}
	}

	return new Matrix(inversedArray);
}
