import { uiModules } from 'ui/modules';

const attributeName = 'data-render-complete';
//edmar moretti contador de elementos
var n = 0;
uiModules
  .get('kibana')
  .directive('renderComplete', () => ({
    controller($scope, $element) {
      //console.log($element);
      const el = $element[0];
      const start = () => {
        $element.attr(attributeName, false);
        n++;
        return true;
      };
      const complete = () => {
        $element.attr(attributeName, true);
        //edmar moretti
        //obtem alguns dados e executa uma funcao no document parent (espera-se que seja um iframe)
        //só funciona com cors permitido
        try {
          n--;
          if(n == 0){
            n = -100;
            var mx = Math.max;
            var d = document;
            var h = mx(d.body.scrollHeight, d.documentElement.scrollHeight);
            h = mx(h, d.body.offsetHeight, d.documentElement.offsetHeight);
            h = mx(h, d.body.clientHeight,d.documentElement.clientHeight)
            console.log("++++ altura directive.js " + h);
            if(window.parent){
              window.parent.postMessage({height: h}, "*");
            }
            //comentado até cors ser habilitado
            /*
            if(window.parent && typeof window.parent.posLoadKibana != "undefined"){
              window.parent.posLoadKibana({height: h});
            } else {
              console.log("Função window.parent.posLoadKibana nao existe")
            }
            */
          }
        } catch (e){}
        return true;
      };

      const teardown = () => {
        el.removeEventListener('renderStart', start);
        el.removeEventListener('renderComplete', complete);
      };

      const setup = () => {
        $element.attr(attributeName, false);
        el.addEventListener('renderStart', start);
        el.addEventListener('renderComplete', complete);
        $scope.$on('$destroy', teardown);
      };

      this.disable = () => {
        $element.attr(attributeName, 'disabled');
        teardown();
      };

      setup();
    }
  }));
