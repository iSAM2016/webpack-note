import _ from './index.js/index.js';
console.log(_.name);

var block = document.getElementById('root');
block.addEventListener('click', function() {
    import('./lodash')
        .then(({ default: _ }) => {
            console.log(_.name);
        })
        .catch(error => 'An error occurred while loading the component');
});
