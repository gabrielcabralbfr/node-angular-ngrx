import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByKeyorwd'
})
export class FilterByKeyWordPipe implements PipeTransform {

  transform(allGroups: any, ...args: any[]): any {
    if (!args[0] || args[0].length <= 1) return allGroups

    console.log("CARAIO");
    
    let keyword = args[0].toLowerCase()
    
    return allGroups.filter(group => group.name.toLowerCase().indexOf(keyword) !== -1)
  }
}