module.exports.preCodeGen = (tree) => {
  tree.nodes.forEach((root) => {
    if (!root || !root.block || !root.block.nodes) return;

    const elementContainers = {};
    let firstIncludeIndex;
    root.block.nodes
      .filter(includes => includes.type === 'Tag' && includes.name === 'includes')
      .forEach((includes, i) => {
        if (firstIncludeIndex == null) firstIncludeIndex = i;

        // Remove 'includes' node from root.
        root.block.nodes.splice(i, 1);

        if (!includes || !includes.block || !includes.block.nodes) return;

        includes.block.nodes
          .filter(included => included.type === 'Tag')
          .forEach((included) => {
            // New generated content should be in `tag + s` node (style+s, script+s).
            const containerName = `${included.name}s`;

            // If container for node doesn't exists => create new.
            if (!elementContainers[containerName]) elementContainers[containerName] = [];

            const container = elementContainers[containerName];
            included.name = 'include';
            container.push(included);
          });
      });

    const nodes = Object.entries(elementContainers)
      .map(([tag, children]) => ({
        attributeBlocks: [],
        attrs: [],
        block: {
          nodes: children,
          type: 'Block',
        },
        name: tag,
        selfClosing: false,
        type: 'Tag',
      }));

    if (firstIncludeIndex != null) {
      root.block.nodes.splice(firstIncludeIndex, 0, ...nodes);
    }
  });

  return tree;
};
