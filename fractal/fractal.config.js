'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'Fractal Component Library');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Set the static HTML build destination */
fractal.web.set('builder.dest', __dirname + '/src/build');

/* Set the path for importing css and js in preview.hbs */
fractal.web.set('static.path', __dirname + '/../dist');

/* Set eacht variants of a component on it's on view */
fractal.components.set('default.collated', false);