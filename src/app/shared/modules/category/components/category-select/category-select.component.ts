import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NbButtonModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { Store } from '@ngrx/store';

import { FormControlInput } from '@app/shared/forms/forms.shared';
import { getCategoriesActions } from '../../store/actions/get-categories.actions';
import { selectCategoryList, selectIsFetchingCategoryList } from '../../store/category.selectors';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NbSelectModule, NbButtonModule, NbIconModule, NbSpinnerModule],
})
export class CategorySelectComponent extends FormControlInput {
  private readonly store = inject(Store);

  public readonly categories = this.store.selectSignal(selectCategoryList);
  public readonly isLoading = this.store.selectSignal(selectIsFetchingCategoryList);

  constructor() {
    super();
    this.store.dispatch(getCategoriesActions.start());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public updateControl(value: any): void {
    this.appControl().setValue(value);
  }

  public createCategory(): void {
    // TODO: Implement another modal window for adding category
    // eslint-disable-next-line no-alert
    confirm('Not implemented feature 😒 try adding category via DB/Graphql Playground');
  }
}
