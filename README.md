# TwoHtmlTemplatesOnOneComponent
Two HTML Templates on one componente using signals()

The goal will be to have a standard template for all differ components which each represent one technical formular for calcultion.
So the feeling and handling of the webpage on all calculation will be the same. But sometimes more expainations are needed or the kind of input methode will be a little bit differ as for the most values. Therefore a additional html template is needed.
Now I am looking for the best way to bind the variables of the component with the both templates. 
In the moment, the same variable value is represented on both html pages and the sub-routines running on the main and same  component.ts, but each html page will have differ values of the same variable!?
The variable values are wrapped by an object (variablebuilder), the the properties are signals() (e.g. nominalValue()).
