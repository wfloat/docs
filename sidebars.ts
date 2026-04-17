import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'Quick Start',
      items: ['quickstart-web-sdk', 'quickstart-react-native-sdk'],
    },
  ],
};

export default sidebars;
