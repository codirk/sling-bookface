package de.messetat.bookface.core.htl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.sling.api.SlingHttpServletRequest;
/*

<div data-sly-use.requestAttr="de.messetat.bookface.core.htl.RequestAttr"></div>
<h1>Inner Sightly ${requestAttr.test} ${requestAttr.size}</h1>

 */
public class RequestAttr implements Map<String, Object> {

    private SlingHttpServletRequest request;

    public RequestAttr(SlingHttpServletRequest request) {
        this.request = request;
    }

    @Override
    public int size() {
        int i = 0;
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            i++;
            attrNames.nextElement();
        }
        return i;
    }

    @Override
    public boolean isEmpty() {
        return size() > 0;
    }

    @Override
    public boolean containsKey(Object key) {
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            Object attr = attrNames.nextElement();
            if (attr.equals(key)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean containsValue(Object value) {
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            Object attr = attrNames.nextElement();
            if (request.getAttribute((String) attr).equals(value)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Object get(Object key) {
        Object value = request.getAttribute((String) key);
        return value;
    }

    @Override
    public Object put(String key, Object value) {
        request.setAttribute((String) key, value);
        return value;
    }

    @Override
    public Object remove(Object key) {
        Object oldValue = get(key);
        request.removeAttribute((String) key);
        return oldValue;
    }

    @Override
    public void putAll(Map<? extends String, ? extends Object> m) {
        for (Map.Entry<? extends String, ? extends Object> entry : m.entrySet()) {
            put(entry.getKey(), entry.getValue());
        }
    }

    @Override
    public void clear() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Set<String> keySet() {
        Set<String> keys = new HashSet<String>();
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            String attr = (String) attrNames.nextElement();
            keys.add(attr);
        }
        return keys;
    }

    @Override
    public Collection<Object> values() {
        Collection<Object> values = new ArrayList<Object>();
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            String attr = (String) attrNames.nextElement();
            values.add(request.getAttribute(attr));
        }
        return values;
    }

    @Override
    public Set<java.util.Map.Entry<String, Object>> entrySet() {
        Set<Map.Entry<String, Object>> entries = new HashSet<Map.Entry<String, Object>>();
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            final String attr = (String) attrNames.nextElement();
            Map.Entry<String, Object> entry = new Map.Entry<String, Object>() {
                @Override
                public String getKey() {
                    return attr;
                }

                @Override
                public Object getValue() {
                    return request.getAttribute(attr);
                }

                @Override
                public Object setValue(Object value) {
                    Object oldValue = getValue();
                    request.setAttribute(attr, value);
                    return oldValue;
                }
            };
            entries.add(entry);
        }
        return entries;
    }

}