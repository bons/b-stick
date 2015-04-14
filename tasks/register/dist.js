module.exports = function(grunt)
{
  // Default task.
  grunt.registerTask('dist', ['jshint', 'karma:dist', 'browserify', 'uglify']);
}
