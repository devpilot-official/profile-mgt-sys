"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pro_vcs_1 = require("@random-guys/pro-vcs");
class NamespacedRepository extends pro_vcs_1.EventRepository {
    restrictedGet(owner, namespace, id) {
        return this.byQuery(owner, {
            _id: id,
            workspace: namespace
        });
    }
    restrictedByQuery(owner, namespace, query) {
        return this.byQuery(owner, Object.assign(Object.assign({}, query), { workspace: namespace }));
    }
    restrictedAll(owner, namespace, query, allowNew) {
        query.conditions = query.conditions || {};
        query.conditions['workspace'] = namespace;
        return this.all(owner, query, allowNew);
    }
    restrictedCreate(owner, namespace, data) {
        return this.create(owner, Object.assign(Object.assign({}, data), { workspace: namespace }));
    }
}
exports.NamespacedRepository = NamespacedRepository;
//# sourceMappingURL=workspace.repo.js.map