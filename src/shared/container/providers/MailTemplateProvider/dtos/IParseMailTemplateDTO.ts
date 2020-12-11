interface ITemplateVariables {
  [key: string]: string | string;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
