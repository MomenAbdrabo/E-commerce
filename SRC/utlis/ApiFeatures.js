

class ApiFeature {

    constructor(queryData, mongooseQuery) {
        this.queryData = queryData;
        this.mongooseQuery = mongooseQuery;
    }
    paginate() {
        let { page, size } = this.queryData
        if (!page || page < 0) {
            page = 1
        }
        if (!size || size < 0) {
            size = 5
        }
        const skip = (parseInt(page) - 1) * parseInt(size)
        this.mongooseQuery.limit(parseInt(size)).skip(skip)
        return this
    }
    filter() {

        const excudeQueryParams = ['page', 'size', 'sort', 'select', 'search', 'feaild'];
        const filterQuery = { ...this.queryData }
        excudeQueryParams.forEach((param) => {
            delete filterQuery[param]
        })
        this.mongooseQuery.find(JSON.parse(JSON.stringify(filterQuery).replace(/(gt|gte|lt|lte|eq|in|nin|neq)/g, match => `$${match}`)))
        return this
    }

    sort() {
        this.mongooseQuery.sort(this.queryData.sort?.replaceAll(',', ' '))
        return this
    }
    search() {
        if (this.queryData.search) {
            this.mongooseQuery.find(
                {
                    $or: [
                        { name: { $regex: this.queryData.search, $options: 'i' } },
                        { description: { $regex: this.queryData.search, $options: 'i' } }
                    ]
                }
            )
        }
        return this
    }
    select() {
        this.mongooseQuery.select(this.queryData.select?.replaceAll(',', ' '))
        return this
    }
}

export default ApiFeature