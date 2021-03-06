export default {
    data() {
        return {
            CancelTokens: {
                catalogCancelToken: axios.CancelToken.source(),
                searchCancelToken: axios.CancelToken.source(),
                companyCancelToken: axios.CancelToken.source(),
                proceduresCancelToken: axios.CancelToken.source(),
            },
        }
    },
    methods: {
        cancelCatalogRequest() {
            this.CancelTokens.catalogCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.catalogCancelToken = axios.CancelToken.source()
        },
        fetchInn(filterRequest) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/`, {params: filterRequest})
        },
        fetchCompaniesByInn(inn) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/inn/${inn}/users`)
        },
        cancelCompanyRequest() {
            this.CancelTokens.companyCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.companyCancelToken = axios.CancelToken.source()
        },
        cancelMarketplaceProceduresRequest() {
            this.CancelTokens.proceduresCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.proceduresCancelToken = axios.CancelToken.source()
        },
        fetchFilter() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/filter/`);
        },
        sendSettingsData(string, data) {
            if (!this.CancelTokens.catalogProceduresCancelToken) {
                this.CancelTokens.catalogProceduresCancelToken = axios.CancelToken.source()
            } else {
                this.CancelTokens.catalogProceduresCancelToken.cancel(
                    'Предыдущий запрос отменен запрос',
                )
                this.CancelTokens.catalogProceduresCancelToken = axios.CancelToken.source()
            }

            return axios.post(
                `${process.env.API_URL_AUTH_SERVICE}/user/settings/${string}`,
                data,
                { cancelToken: this.CancelTokens.catalogProceduresCancelToken.token },
            )
        },
        fetchCatalog(filter, page = 1) {
            let body = {}
            body.page = page

            if (filter) {
                body.filter = filter
            }

            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/`,
                body,
                {cancelToken: this.CancelTokens.catalogCancelToken.token},
            );
        },
        getSettingsData(string) {
            return axios.get(
                `${process.env.API_URL_AUTH_SERVICE}/user/settings/${string}`,
            )
        },
        fetchTotalCatalog(group, filter) {
            let body = {}
            body.group = group

            if (filter) {
                body.filter = filter
            }

            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/total/`,
                body,
                {cancelToken: this.CancelTokens.catalogCancelToken.token},
            );
        },
        searchProceduresOKPD2(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/digests/okpd/search/`,
                { params: { q: string } },
            )
        },
        searchProceduresOKVED(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/digests/okved/search/`,
                { params: { q: string } },
            )
        },
        fetchListSearchCatalog(string) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/`, {
                params: {
                    q: string
                }
            });
        },
        authSignin(l, p) {
            return axios.post(`${process.env.API_URL_AUTH_SERVICE}/user/signin`, {
                login: l,
                password: p,
            });
        },
        fetchUser() {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/user/me`);
        },
        forgotPass(email) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/restore_password_request`, {
                params: {
                    email
                }
            });
        },
        getDate(data) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/settings/tender/`,
                data,
            );
        },
        forgotPassChange(data) {
            return axios.post(
                `${process.env.API_URL_AUTH_SERVICE}/user/restore_password`,
                data,
            );
        },
        fetchSupportInfo() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/settings/feedback/`);
        },
        fetchSupportTopics() {
            return axios.get(`${process.env.API_URL_NOTICE_SERVICE}/api/email/feedback/properties`);
        },
        fetchContragentFeedbackForm(s, f, e, p, c) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/forms/call`, {
                subject: s,
                fio: f,
                email: e,
                phone: p,
                consent: c,
            });
        },
        fetchProceduresOKPD2(field) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/${field}`)
        },
        fetchSupportForm(data) {
            return axios.post(`${process.env.API_URL_NOTICE_SERVICE}/api/email/feedback/send`, data);
        },
        fetchCountries() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/countries`);
        },
        fetchRegions() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/regions`);
        },
        fetchRegisteredCompanyFull(id) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/${id}/full`)
        },
        sendRegistrationData(data) {
            return axios.post(`${process.env.API_URL_AUTH_SERVICE}/user/register`, data)
        },
        sendCatalogMark(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/mark/`, data);
        },
        sendCatalogMarksize(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/marksize/`, data);
        },
        fetchQuotes(quote, date_start, date_end, mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes`, {
                params: {
                    quote, date_start, date_end, mode
                }
            });
        },
        fetchLatestQuotes(quote, mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes/latest/`, {
                params: { quote, mode }
            });
        },
        fetchQuotesDates(mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes/dates/`, {
                params: { mode }
            });
        },
        fetchCompany(data) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/company`,
                data,
                {cancelToken: this.CancelTokens.companyCancelToken.token},
            );
        },
        fetchCompanysByIds(ids) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`,{
                params: {
                    ids: ids.join(','),
                },
            });
        },
        fetchCompaniesByINN(inn) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`,{
                params: {
                    inn: inn.join(','),
                },
            });
        },
        fetchCompaniesByName(name) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`, {
                params: {
                    name: name
                },
            });
        },
        fetchCompanyReportForm(data) {
            return axios.post(`${process.env.API_URL_NOTICE_SERVICE}/api/`, data); // todo поставить url "проверка компании"
        },
        fetchMarketplaceProceduresFilter() {
            return axios.get(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/filter`)
        },
        fetchMarketplaceProcedures(filter = null, page = 1) {
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/list`,
                {
                    ...filter,
                    page,
                },
                { cancelToken: this.CancelTokens.proceduresCancelToken.token },
            );
        },
        addMarketplaceProcedureMark(id, mark) {
            const fData = new FormData();
            fData.append('mark_code', mark);
            return axios.post(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/mark`, fData);
        },
        removeMarketplaceProcedureMark(id, mark) {
            return axios.delete(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/mark/${mark}`)
        },
        fetchTenderItem(id) {
            return axios.get(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}`);
        },
        fetchSettingsProcedures() {
            return axios.get(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/settings/`,
            )
        },
        fetchProceduresPropertyList(entity, property) {
            return axios.get(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/property/${entity}/${property}`,
            )
        },
        fetchUsersFromCompany(id) {
            return axios.get(
                `${process.env.API_URL_AUTH_SERVICE}/companies/${id}/users`,
            )
        },
        cancelCatalogSearch() {
            this.CancelTokens.searchCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.searchCancelToken = axios.CancelToken.source()
        },
        fetchCatalogMark(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/mark/`,
                {
                    params: {
                        q: string,
                    },
                    cancelToken: this.CancelTokens.searchCancelToken.token,
                },
            )
        },
        fetchCatalogMarksize(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/marksize/`,
                {
                    params: {
                        q: string,
                    },
                    cancelToken: this.CancelTokens.searchCancelToken.token,
                },
            )
        },
        fetchCatalogMarksizeOKPD(string, okpd) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/marksize_with_okpd/`,
                {
                    params: {
                        q: string,
                        okpd_2_id: okpd,
                    },
                },
            )
        },
        sendProcedure(data, id) {
            const setId = id ? `/${id}` : ''
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure${setId}`,
                data,
            )
        },
        fetchDaData(query) {
            return axios.post(
                process.env.DA_URL,
                {query},
                {
                    headers: {
                        Authorization: 'Token ' + process.env.DA_API_KEY,
                    },
                },
            )
        },
        fetchAccreditationsList(props) {
            const defaultProps = {
                orderBy: 'id',
                orderDir: 'DESC',
                page: 1,
                search: '',
            }

            const requestProps = Object.assign(defaultProps, props ?? {})

            const fData = new FormData()

            fData.append('page', requestProps.page)
            fData.append('order[by]', requestProps.orderBy)
            fData.append('order[direction]', requestProps.orderDir)

            if (requestProps.search !== '') {
                fData.append('q', requestProps.search)
            }

            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/list`, fData)
        },
        fetchAccreditationDetails(id) {
            return axios.get(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/${id}`)
        },
        updateAccreditation(id, data) {
            const fData = new FormData()

            for (const key in data) {
                fData.append(`documents[${key}]`, data[key])
            }

            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/${id}`, fData)
        },
        sendAccreditationCompany(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation`, data)
        },
        fetchAccreditationSampleRequiredFiles() {
            return axios.get(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/files`)
        },
        fetchCompanyById(inn) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/inn/${inn}/full`);
        }
    }
}
