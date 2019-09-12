const menus = {
  main: `
    syntax:
      etr-cli <options>

    options:
      --templates, -t .... path to templates to render
      --locals, -l ....... path to object containing context (defaults to {})
      --base, -b ......... path to dir that templates are relative to
      --out, -o .......... path to output dir (files relative to base)
      --extension, -e .... file extension of output files

    defaults:
      [-t *.etr]
      [-b <process.cwd()>]
      [-e .html]
      -o undefined evaluates to stdout by default
      -l undefined evaluates to { locals: {} } by default
      
    flags:
      --help, -h ......... help menu
      --version, -v ...... version information
  `,
};

module.exports = args => {
  console.log(menus.main);
};
