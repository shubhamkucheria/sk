angular.module('shubhamTodoController', [])

	.controller('mainController', ['$scope','$http','Todo','$interval', function($scope, $http, Todo, $interval) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.editFunction = false;
		$scope.today = new Date().toLocaleDateString('en-IN');

		// GET =====================================================================
		// when landing on the page, get all todo and show them
		// use the service to get all the todo
      Todo.get()
			.success(function(data) {
				$scope.todo = data;
				$scope.loading = false;
			});


		$scope.ReportGen = function() {
			var arr = [];
			arr.push('','Todo Task', '\n');
			$scope.todo.map(function(item) {
				arr.push(item.text+'\n');
			});
			download(arr, "filename.csv", "text/csv");

		}
		function download(content, filename, contentType)
		{
		    if(!contentType) contentType = 'application/octet-stream';
		        var a = document.createElement('a');
		        var blob = new Blob([content], {'type':contentType});
		        a.href = window.URL.createObjectURL(blob);
		        a.download = filename;
		        a.click();
		}

		// CREATE ==================================================================
		// when submitting the add form, send the data to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todo.create($scope.formData)

					// if successful creation, call our get function to get all the new todo
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todo = data; // assign our new list of todo
					});
			}
		};

		$scope.deletetodolist = function() {
			Todo.deleteList()
				// if successful delete list, call our get function and remove all todo tasks
				.success(function(data) {
					$scope.loading = false;
					$scope.todo = data; // assign our new list of todo
				});
		}


		$scope.edit = function(data) {
			$scope.editFunction = true;
			$scope.formData =  data; // assign again existing todo data which have to edit
		};

		$scope.update = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			// $scope.formData =  data;
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todo.update($scope.formData)

					// if successful update, call our get function to get all the new todo
					.success(function(data) {
						$scope.loading = false;
						$scope.editFunction = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todo = data; // assign our new list of todo
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todo.delete(id)
				// if successful deletion, call our get function to get all the new todo
				.success(function(data) {
					$scope.loading = false;
					$scope.todo = data; // assign our new list of todo
				});
		};
	}]);
