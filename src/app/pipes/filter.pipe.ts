import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any[], filterString: string, propName: string): any[] {

        const resultArray = [];
        if (value){
            if (value.length === 0 || filterString === '' || propName === '') {
                return value;
            }

            for (const item of value) {
                if (item[propName] === filterString) {
                    resultArray.push(item);
                }
            }
            return resultArray;
        } else {
          return null;
        }
    }
}




// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter',
// })

// export class FilterPipe implements PipeTransform {
//   tranform(value: any[], filterString: string, propName: string): any[] {
//     const resultArray = [];
//     if (value.length === 0 || filterString === '' || propName === '') {
//       return value;
//     }

//     for (const item of value) {
//       if (item[propName] === filterString) {
//         resultArray.push(item);
//       }
//     }
//     return resultArray;
//   }
// }

// export class FilterPipe implements PipeTransform {

//   transform(value: any[], filterString: string, propName: string): any[] {

//       const resultArray = [];
//       if (value){
//           if (value.length === 0 || filterString === '' || propName === '') {
//               return value;
//           }

//           for (const item of value) {
//               if (item[propName] === filterString) {
//                   resultArray.push(item);
//               }
//           }
//           return resultArray;
//       }
//   }
// }
