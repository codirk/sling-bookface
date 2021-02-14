package de.messetat.bookface.core.htl;


import de.messetat.sling.core.components.services.ConfigServiceImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.AdapterFactory;
import org.osgi.service.component.annotations.Component;


@Component(service = AdapterFactory.class, immediate = true,
        property = {
                "adaptables=org.apache.sling.api.SlingHttpServletRequest",
                "adapters=de.messetat.bookface.core.htl.RequestAttr"
        }
)
public class RequestAttrAdapterFactory implements AdapterFactory {

    @Override
    public <AdapterType> AdapterType getAdapter(Object adaptable,
                                                Class<AdapterType> type) {
        if (adaptable instanceof SlingHttpServletRequest) {
            return type.cast(new RequestAttr(
                    (SlingHttpServletRequest) adaptable));
        }
        return null;
    }
}