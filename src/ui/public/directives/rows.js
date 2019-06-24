import $ from 'jquery';
import _ from 'lodash';
import AggConfigResult from 'ui/vis/agg_config_result';
import { FilterBarClickHandlerProvider } from 'ui/filter_bar/filter_bar_click_handler';
import { uiModules } from 'ui/modules';
import tableCellFilterHtml from './partials/table_cell_filter.html';
const module = uiModules.get('kibana');

module.directive('kbnRows', function ($compile, $rootScope, getAppState, Private) {
  const filterBarClickHandler = Private(FilterBarClickHandlerProvider);
  return {
    restrict: 'A',
    link: function ($scope, $el, attr) {
      function addCell($tr, contents) {
        function createCell() {
          return $(document.createElement('td'));
        }

        function createFilterableCell(aggConfigResult) {
          const $template = $(tableCellFilterHtml);
          $template.addClass('cell-hover');

          const scope = $scope.$new();

          const $state = getAppState();
          const addFilter = filterBarClickHandler($state);
          scope.onFilterClick = (event, negate) => {
            // Don't add filter if a link was clicked.
            if ($(event.target).is('a')) {
              return;
            }

            addFilter({ point: { aggConfigResult: aggConfigResult }, negate });
          };

          return $compile($template)(scope);
        }

        let $cell;
        let $cellContent;

        if (contents instanceof AggConfigResult) {
          const field = contents.aggConfig.getField();
          const isCellContentFilterable =
            contents.aggConfig.isFilterable()
            && (!field || field.filterable);

          if (isCellContentFilterable) {
            $cell = createFilterableCell(contents);
            $cellContent = $cell.find('[data-cell-content]');
          } else {
            $cell = $cellContent = createCell();
          }

          // An AggConfigResult can "enrich" cell contents by applying a field formatter,
          // which we want to do if possible.
          contents = contents.toString('html');
        } else {
          $cell = $cellContent = createCell();

          // TODO: It would be better to actually check the type of the field, but we don't have
          // access to it here. This may become a problem with the switch to BigNumber
          if (_.isNumeric(contents)) {
            $cell.addClass('numeric-value');
          }
        }

        if (_.isObject(contents)) {
          if (contents.attr) {
            $cellContent.attr(contents.attr);
          }

          if (contents.class) {
            $cellContent.addClass(contents.class);
          }

          if (contents.scope) {
            $cellContent = $compile($cellContent.prepend(contents.markup))(contents.scope);
          } else {
            $cellContent.prepend(contents.markup);
          }

          if (contents.attr) {
            $cellContent.attr(contents.attr);
          }
        } else {
          if (contents === '') {
            $cellContent.prepend('&nbsp;');
          } else {
            $cellContent.prepend(contents);
          }
        }
        //editado por edmar moretti
          var celula = $cell.find("a");
          if(celula.is("a") && celula.attr('href') != undefined && celula.attr('href').indexOf("modal=true") > 0){
            celula.click(function(event){
              event.stopPropagation();
              /*
              var div = $("<div>").addClass("filterEditor kuiModal").css({"width":"98vw","height":"98vh"});
              var cabecalho = $("<div>").addClass("kuiModalHeader").html('<div class="kuiModalHeader__title">Cabeçalho</div><button class="kuiModalHeaderCloseButton kuiIcon fa-times" ></button>');
              var body = $("<div>").addClass("kuiModalBody").html("<iframe style='width:100%;height:80vh;overflow:auto' src='" + event.target.href + "' >");
              var footer = $("<div>").addClass("kuiModalFooter kuiBar").html('<div class="kuiBarSection"><button class="kuiButton kuiButton--basic" >Cancelar</button></div>');
              cabecalho.click(function(){div.remove();});
              footer.click(function(){div.remove();});
              div.prepend(cabecalho,body);
              $("body").prepend(div);
              */
              window.open(event.target.href.replace("&modal=true",""), "_blank", "toolbar=no,location=no,scrollbars=yes,resizable=yes,top=0,left=0,width=800,height=800");
              void(0);
              return false;
            });
          }
        $tr.append($cell);
      }

      function maxRowSize(max, row) {
        return Math.max(max, row.length);
      }

      $scope.$watchMulti([
        attr.kbnRows,
        attr.kbnRowsMin
      ], function (vals) {
        let rows = vals[0];
        const min = vals[1];

        $el.empty();

        if (!Array.isArray(rows)) rows = [];
        const width = rows.reduce(maxRowSize, 0);

        if (isFinite(min) && rows.length < min) {
          // clone the rows so that we can add elements to it without upsetting the original
          rows = _.clone(rows);
          // crate the empty row which will be pushed into the row list over and over
          const emptyRow = new Array(width);
          // fill the empty row with values
          _.times(width, function (i) { emptyRow[i] = ''; });
          // push as many empty rows into the row array as needed
          _.times(min - rows.length, function () { rows.push(emptyRow); });
        }

        rows.forEach(function (row) {
          const $tr = $(document.createElement('tr')).appendTo($el);
          row.forEach(function (cell) {
            addCell($tr, cell);
          });
        });
      });
    }
  };
});
