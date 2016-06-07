var group = function(name, id, creationDate, createdBy, employees)
{
  this.name=name;
  this.id=id;
  this.creationDate=creationDate;
  this.createdBy=createdBy;
  this.employees=Array.prototype.pop.apply(arguments);
} 