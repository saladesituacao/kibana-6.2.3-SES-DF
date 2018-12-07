import 'plugins/kbn_searchtables/kbn_searchtables.less';
import 'plugins/kbn_searchtables/kbn_searchtables_controller';
import 'plugins/kbn_searchtables/kbn_searchtables_params';
import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { CATEGORY } from 'ui/vis/vis_category';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
import searchtableVisTemplate from 'plugins/kbn_searchtables/kbn_searchtables.html';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import image from './images/icon-table.svg';
// we need to load the css ourselves

// we also need to load the controller and used by the template

// our params are a bit complex so we will manage them with a directive

// require the directives that we use as well

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(TableVisTypeProvider);

// define the TableVisType
function TableVisTypeProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  // define the TableVisController which is used in the template
  // by angular's ng-controller directive

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return VisFactory.createAngularVisualization({
    type: 'searchtables',
    name: 'searchtables',
    title: 'Searchtables',
    image,
    description: 'Display values in a table and an input for search items without applying filters',
    category: CATEGORY.DATA,
    visConfig: {
      defaults: {
        perPage: 10,
        showPartialRows: false,
        showMeticsAtAllLevels: false,
        sort: {
          columnIndex: null,
          direction: null
        },
        showTotal: false,
        totalFunc: 'sum'
      },
      template: searchtableVisTemplate,
    },
    editorConfig: {
      optionsTemplate: '<table-vis-params></table-vis-params>',
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          aggFilter: ['!geo_centroid', '!geo_bounds'],
          min: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        },
        {
          group: 'buckets',
          name: 'bucket',
          title: 'Split Rows',
          aggFilter: ['!filter']
        },
        {
          group: 'buckets',
          name: 'split',
          title: 'Split Table',
          aggFilter: ['!filter']
        }
      ])
    },
    responseHandlerConfig: {
      asAggConfigResults: true
    },
    hierarchicalData: function (vis) {
      return Boolean(vis.params.showPartialRows || vis.params.showMeticsAtAllLevels);
    }
  });
}

export default TableVisTypeProvider;