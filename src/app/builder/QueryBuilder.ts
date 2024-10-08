import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'searchTerm'];
    excludedFields.forEach((el) => delete queryObj[el]);
    if (queryObj.category) {
      queryObj.category = { $in: queryObj.category };
    }
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = (this.query.sort as string).split(',').join(' ');
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }
    return this;
  }
}

export default QueryBuilder;
